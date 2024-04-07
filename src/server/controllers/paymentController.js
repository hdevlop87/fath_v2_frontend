
import { sql, eq, and } from "drizzle-orm";
import { db } from '@/db';
import { payments, sales } from '@/db/schema';

//=========================================================================//
//======================= create Payment ================================//
export const createPayment = async (paymentDetail) => {
   const [payment] = await db.insert(payments).values(paymentDetail).returning();
   await checkVerifiedPayments(payment.paymentID);
   await updateBalanceDue(payment.saleID);
   return payment.paymentID;
};

//=========================================================================//
//======================= update Payment by id ===========================//
export const updatePayment = async (paymentID, paymentDetail) => {
   const [payment] = await db.update(payments)
      .set(paymentDetail)
      .where(eq(payments.paymentID, paymentID))
      .returning();

   await checkVerifiedPayments(paymentID);
   await updateBalanceDue(payment.saleID);
   return payment?.paymentID;
};
//=========================================================================//
//======================= delete Payment by id ============================//
export const deletePayment = async (paymentID) => {
   const [payment] = await getPaymentById(paymentID);
   const { saleID } = payment;

   await db.delete(payments)
      .where(eq(payments.paymentID, paymentID))
      .returning();

   await updateBalanceDue(saleID);

   return paymentID;
};
//=========================================================================//
//======================= get all Payments ===============================//
export const getAllPayments = async () => {
   return await db.select().from(payments);
};
//=========================================================================//
//======================= remove all Payments =============================//
export const deleteAllPayments = async () => {
   return await db.delete(payments);
};
//=========================================================================//
//======================= get Payment by id ==============================//
export const getPaymentById = async (paymentID) => {
   return await db.select().from(payments).where(eq(payments.paymentID, paymentID));
};
//=========================================================================//
//======================= get Payment by saleId ==============================//
export const getPaymentsBySaleId = async (saleID) => {
   return await db.select().from(payments).where(eq(payments.saleID, saleID));
};
//==========================================================================//
//==========================================================================//

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

export const updateBalanceDue = async (saleID) => {
   const totalPaid = await getTotalPaidBySaleID(saleID);
   const totalPrice = await getTotalPriceBySaleID(saleID);
   let balanceDue = totalPrice - totalPaid;
   if (balanceDue > totalPrice) {
      balanceDue = totalPrice;
   } else if (balanceDue < 0) {
      balanceDue = 0;
   }

   let saleStatus = 'Initiated';

   if (!totalPaid) {
      saleStatus = 'Initiated';
   } else if (balanceDue > 0) {
      saleStatus = 'Ongoing';
   } else if (balanceDue <= 0) {
      saleStatus = 'Completed';
   }

   await db.update(sales)
      .set({ balanceDue, status: saleStatus })
      .where(eq(sales.saleID, saleID));

   await setPaidPercentage(saleID)
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
//==========================================================================//
//======================== get Sum of Verified Payments ====================//

export const checkVerifiedPayments = async (paymentID) => {
   const [payment] = await db.select().from(payments).where(eq(payments.paymentID, paymentID));

   if (payment?.receipt && payment?.status === 'Pending') {
      await db.update(payments)
         .set({ status: 'Verified' })
         .where(eq(payments.paymentID, paymentID))
         .returning();
   }
};

