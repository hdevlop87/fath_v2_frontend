import { NextResponse } from 'next/server';
import { getPaymentsBySaleId } from '@/controllers/paymentController';
import withAuth from '@/lib/withAuth';

export const GET = withAuth(async (req, { params }) => {
    const saleID = params.saleID;

    try {
        const allPayments = await getPaymentsBySaleId(saleID);
        if (allPayments.length == 0) {
            return NextResponse.json({ success: false, message: 'Payment not found' }, { status: 200 });
        }
        return NextResponse.json(allPayments, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});
