import { sql, eq, and, not } from "drizzle-orm";
import { db } from '@/server/db';
import { lots, sales, customers } from '@/server/db/schema';
import validateSchema from '@/server/db/validation';

//============================================================================//
//========================= All lot checks ===================================//

export const checkLotRefExists = async (lotRef, currentLotId = null) => {
   const existingLot = currentLotId
      ? await db.select().from(lots).where(sql`${lots.lotID} != ${currentLotId} and ${lots.lotRef} = ${lotRef}`)
      : await db.select().from(lots).where(eq(lots.lotRef, lotRef));

   if (existingLot.length > 0) {
      throw new Error('lot already exists');
   }
};


export const checkLotAvailability = async (lotRef) => {
   const status = await getLotStatus(lotRef);
   if (status !== 'Available') {
      throw new Error('The lot is not available for sale.');
   }
   const [lot] = await getLotByRef(lotRef);
   return lot.lotID;
};
//=========================================================================//
//========================= create Lot ===================================//

export const createLot = async (lotDetail) => {
   await validateSchema('lot', lotDetail);
   await checkLotRefExists(lotDetail.lotRef);
   const [lot] = await db.insert(lots).values(lotDetail).returning();
   return lot.lotID;
};

//=========================================================================//
//========================= get lot by id ================================//

export const getLotById = async (lotID) => {
   return await db.select().from(lots).where(eq(lots.lotID, lotID));
};

//=========================================================================//
//========================= get lot by ref ===============================//

export const getLotByRef = async (lotRef) => {
   return await db.select().from(lots).where(eq(lots.lotRef, lotRef));
};

//========================================================================//
//========================= update lot by id ============================//

export const updateLot = async (lotID, lotDetail) => {

   if (lotDetail.lotRef) {
      await checkLotRefExists(lotDetail.lotRef, lotID);
   }
   const [lot] = await db.update(lots)
      .set(lotDetail)
      .where(eq(lots.lotID, lotID))
      .returning();
   return lot?.lotID;
};

//========================================================================//
//========================= delete lot by id ============================//

export const deleteLot = async (lotID) => {
   const [lot] = await db.delete(lots)
      .where(eq(lots.lotID, lotID))
      .returning();

   await resetSequence();
   return lot?.lotID;
};

//=======================================================================//
//======================= get all Lots ==================================//
// export const getAllLots = async () => {
//    return await db.select().from(lots).orderBy(lots.lotID);
// };
export const getAllLots = async () => {
   const result = await db
      .select({
         lotID: lots.lotID,
         lotRef: lots.lotRef,
         status: lots.status,
         size: lots.size,
         price: lots.price,
         address: lots.address,
         zoningCode: lots.zoningCode,
         customerName: sql`${customers.firstName} || ' ' || ${customers.lastName}`,
         CIN: customers.CIN,
         saleID: sales.saleID
      })
      .from(lots)
      .leftJoin(sales, eq(lots.lotID, sales.lotID))
      .leftJoin(customers, eq(sales.customerID, customers.customerID))
      .orderBy(lots.lotID);

   return result;
};


//=====================================================================//
//======================= remove all Lots =============================//
export const deleteAllLots = async () => {

   let result = await db.delete(lots);
   await resetSequence();
   return result
};
//=====================================================================//
//======================= remove all Lots =============================//
export const getLotStatus = async (lotRef) => {
   const [lot] = await getLotByRef(lotRef);
   if (!lot) {
      throw new Error('The provided lotRef does not exist.');
   }
   return lot.status;
};

export const bulkInsertLots = async (lotDetailsArray) => {

   
   if (!lotDetailsArray || lotDetailsArray.length === 0) {
      throw new Error("No lot details provided for bulk insert");
   }
   
   for (let lotDetail of lotDetailsArray) {
      await checkLotRefExists(lotDetail.lotRef);
   }
   
   lotDetailsArray = lotDetailsArray.map(lot => ({
      lotRef: lot.lotRef,
      zoningCode: lot.zoningCode,
      size: parseFloat(lot.size), 
      price: parseFloat(lot.price), 
      address: lot.address || null, 
      status: lot.status
   }));
   return await db.insert(lots).values(lotDetailsArray);

};

export const resetAllLots = async () => {
   return await db.update(lots).set({ status: 'Available' });
};

const resetSequence = async () => {
   const query1 = sql`SELECT setval(pg_get_serial_sequence('lots', 'lotID'), COALESCE((SELECT MAX("lotID") + 1 FROM sales), 1), false)`
   const query2 = sql`SELECT setval(pg_get_serial_sequence('sales', 'saleID'), COALESCE((SELECT MAX("saleID") + 1 FROM sales), 1), false)`
   await db.execute(query1);
   await db.execute(query2);
}