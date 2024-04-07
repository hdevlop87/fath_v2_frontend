import { sql, eq, and, not } from "drizzle-orm";
import { db } from '@/db';
import { customers, lots, sales } from '@/db/schema';
import validateSchema from '@/db/validation';

const checkCINExists = async (CIN, currentCustomerId = null) => {
   let existingCustomer = currentCustomerId === null
      ? await db.select().from(customers).where(eq(customers.CIN, CIN))
      : await db.select().from(customers).where(
         and(sql`${customers.customerID} != ${currentCustomerId}`, eq(customers.CIN, CIN))
      );
   if (existingCustomer.length > 0) {
      throw new Error('CIN already exists for another customer');
   }
};

const checkPhoneExists = async (phone, currentCustomerId = null) => {
   let existingCustomer = currentCustomerId === null
      ? await db.select().from(customers).where(eq(customers.phone, phone))
      : await db.select().from(customers).where(
         and(sql`${customers.customerID} != ${currentCustomerId}`, eq(customers.phone, phone))
      );
   if (existingCustomer.length > 0) {
      throw new Error('customer.phoneExist');
   }
};

const checkEmailExists = async (email, currentCustomerId = null) => {
   let existingCustomer = currentCustomerId === null
      ? await db.select().from(customers).where(eq(customers.email, email))
      : await db.select().from(customers).where(
         and(sql`${customers.customerID} != ${currentCustomerId}`, eq(customers.email, email))
      );
   if (existingCustomer.length > 0) {
      throw new Error('customer.emailExist');
   }
};

//=========================================================================//
//========================= create Customer ===============================//
export const createCustomer = async (customerDetail) => {
   await validateSchema('customer', customerDetail);
   await checkCINExists(customerDetail.CIN);
   await checkPhoneExists(customerDetail.phone);
   await checkEmailExists(customerDetail.email);

   const [customer] = await db.insert(customers).values(customerDetail).returning();
   return customer.customerID;
};
//=========================================================================//
//====================== get customer by id ==============================//
export const getCustomerById = async (customerID) => {
   return await db.select().from(customers).where(eq(customers.customerID, customerID));
};
//=========================================================================//
//======================= update customer by id ===========================//
export const updateCustomer = async (customerID, customerDetail) => {
   await checkCINExists(customerDetail.CIN, customerID);
   await checkPhoneExists(customerDetail.phone, customerID);
   await checkEmailExists(customerDetail.email, customerID);

   const [customer] = await db.update(customers)
      .set(customerDetail)
      .where(eq(customers.customerID, customerID))
      .returning();

   return customer?.customerID;
};
//=========================================================================//
//====================== delete customer by id ============================//
export const deleteCustomer = async (customerID) => {
   const [customer] = await db.delete(customers)
      .where(eq(customers.customerID, customerID))
      .returning();

   return customer?.customerID;
};
//=========================================================================//
//======================= get all Customers ===============================//
// export const getAllCustomers = async () => {
//    return await db.select().from(customers);
// };
//=========================================================================//
//====================== remove all Customers =============================//
export const deleteAllCustomers = async () => {
   let result = await db.delete(customers);
   await resetSequence();
   return result;
};
//=========================================================================//
//======================= bulkInsertCustomers =============================//
export const bulkInsertCustomers = async (customerDetailsArray) => {
   if (!customerDetailsArray || customerDetailsArray.length === 0) {
      throw new Error("No customer details provided for bulk insert");
   }

   for (let customerDetail of customerDetailsArray) {
      await validateSchema('customer', customerDetail);
      await checkCINExists(customerDetail.CIN);
      await checkPhoneExists(customerDetail.phone);
      await checkEmailExists(customerDetail.email);
   }

   // Now insert the records.
   return await db.insert(customers).values(customerDetailsArray);

};
//=========================================================================//
//============================ customerExists =============================//
export const customerExists = async (data) => {
   const [resp] = await db.select().from(customers).where(eq(customers.CIN, data.CIN));

   if (resp) {
      return {
         exists: true,
         customer: resp
      };
   } else {
      return {
         exists: false,
         id: null
      };
   }
};


export const getAllCustomers = async () => {
   const result = await db
      .select({
         customerID: customers.customerID,
         firstName: customers.firstName,
         lastName: customers.lastName,
         phone: customers.phone,
         address: customers.address,
         email: customers.email,
         CIN: customers.CIN,
         lotRefs: sql`array_agg(${lots.lotRef})`
      })
      .from(customers)
      .leftJoin(sales, eq(customers.customerID, sales.customerID))
      .leftJoin(lots, eq(sales.lotID, lots.lotID))
      .groupBy(customers.customerID);

   return result;
};


const resetSequence = async () => {
   const query = sql`SELECT setval(pg_get_serial_sequence('sales', 'saleID'), COALESCE((SELECT MAX("saleID") + 1 FROM sales), 1), false)`
   await db.execute(query);
}