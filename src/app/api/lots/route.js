import { createLot, getAllLots, deleteAllLots } from '@/server/controllers/lotController';
import { NextResponse } from 'next/server';
import withAuth from '@/lib/withAuth';
//====================== Get all lots ===========================================//
export const GET = withAuth(async () => {
   try {
      const lots = await getAllLots();
      return NextResponse.json(lots);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
});

//====================== Create one lot ===========================================//
export const POST = withAuth(async (req) => {
   const lotData = await req.json();

   try {
      const lotID = await createLot(lotData);
      return NextResponse.json({ message: `Lot id = ${lotID} created successfully ` });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}, ['admin']);
//====================== Delete all lots ===========================================//
export const DELETE = async (req) => {
   try {
      await deleteAllLots();
      return NextResponse.json({ message: 'All lots have been deleted.' });
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}
