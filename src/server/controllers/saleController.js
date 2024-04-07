import { sql, eq, and } from "drizzle-orm";
import { db } from '@/db';
import { sales, lots, customers, payments } from '@/db/schema';
import validateSchema from '@/db/validation';
import { updateLot, checkLotAvailability, getLotById } from './lotController';
import { getCustomerById, createCustomer, customerExists, deleteCustomer } from './customerController';
import { createPayment, getPaymentsBySaleId } from './paymentController';

//===========================================================================//
//=============================== create Sale ===============================//
export const createSale = async (saleDetail) => {
   await validateSchema('sale', saleDetail);
   const lotID = await checkLotAvailability(saleDetail.lotRef);
   saleDetail.lotID = lotID;
   delete saleDetail.lotRef;
   const [sale] = await db.insert(sales).values(saleDetail).returning();
   await setTotalPrice(sale.saleID);
   await setBalanceDue(sale.saleID)
   return sale.saleID;
};
//============================================================================//
//========================== create Sale wizard===============================//
export const createSaleWizard = async (data) => {
   let customerID, saleID, paymentIds = [];
   try {
      const customerCheckResult = await customerExists(data.customer);

      if (customerCheckResult.exists) {
         customerID = customerCheckResult.customer.customerID;
      } else {
         customerID = await createCustomer(data.customer);
      }
   }
   catch (error) {
      throw new Error(error.message);
   }

   try {
      const saleData = { ...data.sale, customerID: customerID };
      saleID = await createSale(saleData);
   }
   catch (error) {
      throw new Error(error.message);
   }
   
   try {
      const paymentDataArray = Array.isArray(data.payments) ? data.payments : [data.payment];

      for (const paymentData of paymentDataArray) {
         paymentData.saleID = saleID;
         const paymentId = await createPayment(paymentData);
         paymentIds.push(paymentId);
      }

      await setBalanceDue(saleID);
   }
   catch (error) {
      await deleteSale(saleID);
      await deleteCustomer(customerID);
      throw new Error(error.message);
   }

   return {
      customerID,
      saleID,
      paymentIds
   };
};
//===========================================================================//
//========================= update sale by id ===============================//
export const updateSale = async (saleID, saleDetail) => {

   const [currentSale] = await getSaleById(saleID);
   if (!currentSale) {
      throw new Error('Sale not found.');
   }

   const [currentLot] = await getLotById(currentSale.lotID);
   if (!currentLot) {
      throw new Error('Associated lot not found.');
   }

   if (saleDetail.lotRef && saleDetail.lotRef !== currentLot.lotRef) {
      const newLotID = await checkLotAvailability(saleDetail.lotRef);
      saleDetail.lotID = newLotID;
   }

   delete saleDetail.lotRef;

   const [updatedSale] = await db.update(sales)
      .set(saleDetail)
      .where(eq(sales.saleID, saleID))
      .returning();

   await setTotalPrice(saleID);
   await setBalanceDue(saleID);
   return updatedSale.saleID;
};
//===========================================================================//
//========================= delete sale by id ===============================//
export const deleteSale = async (saleID) => {

   const [currentSale] = await getSaleById(saleID);
   if (!currentSale) {
      throw new Error('Sale not found.');
   }

   const [deletedSale] = await db.delete(sales)
      .where(eq(sales.saleID, saleID))
      .returning();


   if (deletedSale) {
      await updateLot(currentSale.lotID, { status: 'Available' });
   }

   await resetSequence();

   return deletedSale?.saleID;
};
//===========================================================================//
//========================= get all Sales ===================================//
export const getAllSales = async () => {
   return await db.select({
      ...sales,
      lotRef: lots.lotRef,
      customerName: sql`${customers.firstName} || ' ' || ${customers.lastName}`
   })
      .from(sales)
      .leftJoin(lots, eq(sales.lotID, lots.lotID))
      .leftJoin(customers, eq(sales.customerID, customers.customerID));
};
//======================================================================================//
//=================================== remove all Sales =================================//
export const deleteAllSales = async () => {
   let result = await db.delete(sales);
   await resetSequence();
   return result
};
//======================================================================================//
//================================== calculation  ======================================//
export const getTotalPaidBySaleID = async (saleID) => {
   const result = await db.select({
      totalPaid: sql`SUM(amount) as totalPaidAmount`
   })
      .from(payments)
      .where(and(eq(payments.saleID, saleID), eq(payments.status, 'Verified')))

   return result[0]?.totalPaid;
};

export const getTotalPriceBySaleID = async (saleID) => {
   const result = await db.select({
      totalPrice: sales.totalPrice
   })
      .from(sales)
      .where(eq(sales.saleID, saleID))
      .limit(1);

   return result[0]?.totalPrice || 0;
};

export const setBalanceDue = async (saleID) => {

   const totalPaid = await getTotalPaidBySaleID(saleID);
   const totalPrice = await getTotalPriceBySaleID(saleID);

   let balanceDue = totalPrice - totalPaid;
   if (balanceDue > totalPrice) {
      balanceDue = totalPrice;
   } else if (balanceDue < 0) {
      balanceDue = 0;
   }

   const [currentSale] = await getSaleById(saleID);

   let saleStatus;
   if (currentSale.status !== 'Canceled') {
      saleStatus = 'Initiated';
      if (balanceDue > 0 && totalPaid > 0) {
         saleStatus = 'Ongoing';
      } else if (balanceDue <= 0) {
         saleStatus = 'Completed';
      }
   } else {
      saleStatus = 'Canceled';
   }

   await db.update(sales)
      .set({ balanceDue, status: saleStatus })
      .where(eq(sales.saleID, saleID));

   await setPaidPercentage(saleID);
};

export const setTotalPrice = async (saleID) => {
   const [currentSale] = await getSaleById(saleID);
   if (!currentSale) {
      throw new Error('Sale not found.');
   }
   const [lotInfo] = await getLotById(currentSale.lotID);
   if (!lotInfo) {
      throw new Error('Lot not found.');
   }
   const totalPrice = lotInfo.size * currentSale.pricePerM2;
   await db.update(sales)
      .set({ totalPrice })
      .where(eq(sales.saleID, saleID));
};

export const setPaidPercentage = async (saleID) => {
   const totalPaid = await getTotalPaidBySaleID(saleID);
   const totalPrice = await getTotalPriceBySaleID(saleID);

   if (totalPrice === 0) {
      throw new Error('Total price must be greater than zero to calculate paid percentage.');
   }

   let paidPercentage = (totalPaid / totalPrice) * 100;

   if (paidPercentage > 100) {
      paidPercentage = 100;
   } else if (paidPercentage < 0) {
      paidPercentage = 0;
   }

   await db.update(sales)
      .set({ paidPercentage })
      .where(eq(sales.saleID, saleID));
};
//============================================================================//
//========================= get sale by id ===================================//
export const getSaleById = async (saleID) => {
   return await db.select().from(sales).where(eq(sales.saleID, saleID));
};
//============================================================================//
//====================== get complete by id ==================================//
export const getCompleteSaleById = async (saleID) => {
   const [sale] = await getSaleById(saleID);
   const [customer] = await getCustomerById(sale.customerID);
   const [lot] = await getLotById(sale.lotID);
   const payments = await getPaymentsBySaleId(saleID);

   const completeSale = {
      sale: sale,
      customer: customer,
      lot: lot,
      payments: payments
   };

   return completeSale;
}
//======================================================================================//
//================================== reset Sequence  ===================================//
const resetSequence = async () => {
   const query = sql`SELECT setval(pg_get_serial_sequence('sales', 'saleID'), COALESCE((SELECT MAX("saleID") + 1 FROM sales), 1), false)`
   await db.execute(query);
}




















// export const createSale = async (saleDetail) => {

//    await validateSchema('sale', saleDetail);
//    const lotID = await checkLotAvailability(saleDetail.lotRef);
//    saleDetail.lotID = lotID;
//    delete saleDetail.lotRef;

//    const [sale] = await db.insert(sales).values(saleDetail).returning();
//    const lotStatus = getLotStatusFromSaleStatus(saleDetail.status);
//    await updateLot(sale?.lotID, { status: lotStatus, price: saleDetail.price });
//    return sale.saleID;
// };
