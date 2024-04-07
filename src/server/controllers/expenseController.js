import { sql, eq } from "drizzle-orm";
import { db } from '@/db';
import { expenses } from '@/db/schema';

//=========================================================================//
//======================= create Expense ================================//
export const createExpense = async (expenseDetail) => {
    const [expense] = await db.insert(expenses).values(expenseDetail).returning();
    return expense.expenseID;
 };
 //=========================================================================//
 //======================= get Expense by id ==============================//
 export const getExpenseById = async (expenseID) => {
    return await db.select().from(expenses).where(eq(expenses.expenseID, expenseID));
 };
 //=========================================================================//
 //======================= update Expense by id ===========================//
 export const updateExpense = async (expenseID, expenseDetail) => {
    const [expense] = await db.update(expenses)
       .set(expenseDetail)
       .where(eq(expenses.expenseID, expenseID))
       .returning();
    return expense?.expenseID;
 };
 //=========================================================================//
 //======================= delete Expense by id ============================//
 export const deleteExpense = async (expenseID) => {
    const [expense] = await db.delete(expenses)
       .where(eq(expenses.expenseID, expenseID))
       .returning();
    return expense?.expenseID;
 };
 //=========================================================================//
 //======================= get all Expenses ===============================//
 export const getAllExpenses = async () => {
    return await db.select().from(expenses);
 };
 //=========================================================================//
 //======================= remove all Expenses =============================//
 export const deleteAllExpenses = async () => {
    return await db.delete(expenses);
 };
