import { NextResponse } from 'next/server';
import { getSaleById, updateSale, deleteSale,getCompleteSaleById } from '@/controllers/saleController';
import withAuth from '@/lib/withAuth';

export const GET = withAuth(async (req, { params }) => {
    const saleID = params.saleID;

    try {
        const singleSale = await getCompleteSaleById(saleID);
        if (!singleSale) {
            return NextResponse.json({ message: 'Sale not found' }, { status: 404 });
        }
        return NextResponse.json(singleSale, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const PATCH = withAuth(async (req, { params }) => {
    const saleID = params.saleID;
    const updatedData = await req.json();

    try {
        const updatedSale = await updateSale(saleID, updatedData);

        if (!updatedSale) {
            return NextResponse.json({ message: 'Sale not found' }, { status: 404 });
        }

        return NextResponse.json({ updatedSale, message: 'Sale updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);

export const DELETE = withAuth(async (req, { params }) => {
    const saleID = params.saleID;

    try {
        const deletedSale = await deleteSale(saleID);

        if (!deletedSale) {
            return NextResponse.json({ message: 'Sale not found' }, { status: 404 });
        }
        return NextResponse.json({ deletedSale, message: 'Sale deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);
