import { NextResponse } from 'next/server';
import { getLotById, updateLot, deleteLot } from '@/controllers/lotController';
import withAuth from '@/lib/withAuth';

export const GET = withAuth(async (req, { params }) => {
    const lotID = params.lotID || params.lotId;

    try {
        const [singleLot] = await getLotById(lotID);
        if (!singleLot) {
            return NextResponse.json({ message: 'Lot not found' }, { status: 404 });
        }
        return NextResponse.json(singleLot, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
});

export const PATCH = withAuth(async (req, { params }) => {
    const lotID = params.lotID || params.lotId;
    const updatedData = await req.json();
    try {
        const updatedLot = await updateLot(lotID, updatedData);

        if (!updatedLot) {
            return NextResponse.json({ message: 'Lot not found' }, { status: 404 });
        }

        return NextResponse.json({ updatedLot, message: 'Lot updated successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}, ['admin']);

export const DELETE = withAuth(async (req, { params }) => {
    const lotID = params.lotID || params.lotId;
    try {
        const deletedLot = await deleteLot(lotID);

        if (!deletedLot) {
            return NextResponse.json({ message: 'Lot not found' }, { status: 404 });
        }
        return NextResponse.json({ params, message: 'Lot deleted successfully' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({  message: error.message }, { status: 500 });
    }
}, ['admin']);
