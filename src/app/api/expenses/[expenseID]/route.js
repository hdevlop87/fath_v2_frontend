import { NextResponse } from 'next/server';
import { getExpenseById, updateExpense, deleteExpense } from '@/controllers/expenseController';
import withAuth from '@/lib/withAuth';

//========================================================================//
//========================================================================//

export const GET = withAuth(async (req, { params }) => {
    const expenseID = params.expenseID;

    try {
        const [singleExpense] = await getExpenseById(expenseID);
        if (!singleExpense) {
            return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
        }
        return NextResponse.json(singleExpense, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

//========================================================================//
//========================================================================//

export const PATCH = withAuth(async (req, { params }) => {
    const expenseID = params.expenseID;
    const updatedData = await req.json();
    try {
        const updatedExpense = await updateExpense(expenseID, updatedData);

        if (!updatedExpense) {
            return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
        }

        return NextResponse.json({ updatedExpense, message: 'Expense updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);

//========================================================================//
//========================================================================//

export const DELETE = withAuth(async (req, { params }) => {
    const expenseID = params.expenseID;

    try {
        const deletedExpense = await deleteExpense(expenseID);

        if (!deletedExpense) {
            return NextResponse.json({ message: 'Expense not found' }, { status: 404 });
        }
        return NextResponse.json({ deletedExpense, message: 'Expense deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);
