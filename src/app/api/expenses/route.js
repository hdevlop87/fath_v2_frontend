import { createExpense, getAllExpenses, deleteAllExpenses } from '@/controllers/expenseController';
import { NextResponse } from 'next/server';
import withAuth from '@/lib/withAuth';
//====================== Get all expenses ===========================================//
export const GET = withAuth(async () => {
   try {
      const expenses = await getAllExpenses();
      return NextResponse.json(expenses);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
});

//====================== Create one expense ===========================================//
export const POST = withAuth(async (req) => {
   const expenseData = await req.json();

   try {
      const expenseID = await createExpense(expenseData);
      return NextResponse.json({ message: `Expense id = ${expenseID} created successfully ` });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}, ['admin']);

//====================== Delete all expenses ===========================================//
export const DELETE = async (req) => {
   // try {
   //    await deleteAllExpenses();
   //    return NextResponse.json({ message: 'All expenses have been deleted.' });
   // } catch (error) {
   //    return NextResponse.json({ message: error.message }, { status: 500 });
   // }
}
