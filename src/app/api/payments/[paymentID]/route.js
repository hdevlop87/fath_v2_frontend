import { NextResponse } from 'next/server';
import { getPaymentById, updatePayment, deletePayment } from '@/controllers/paymentController';
import withAuth from '@/lib/withAuth';

export const GET = withAuth(async (req, { params }) => {
    const paymentID = params.paymentID;

    try {
        const singlePayment = await getPaymentById(paymentID);
        if (!singlePayment) {
            return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
        }
        return NextResponse.json(singlePayment, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const PATCH = withAuth(async (req, { params }) => {
    const paymentID = params.paymentID;
    const updatedData = await req.json();

    try {
        const updatedPayment = await updatePayment(paymentID, updatedData);

        if (!updatedPayment) {
            return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
        }

        return NextResponse.json({ updatedPayment, message: 'Payment updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);

export const DELETE = withAuth(async (req, { params }) => {
    const paymentID = params.paymentID;

    try {
        const deletedPayment = await deletePayment(paymentID);

        if (!deletedPayment) {
            return NextResponse.json({ message: 'Payment not found' }, { status: 404 });
        }
        return NextResponse.json({ deletedPayment, message: 'Payment deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);
