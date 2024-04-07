import { createSale, getAllSales, deleteAllSales,createSaleWizard } from '@/controllers/saleController';
import { NextResponse } from 'next/server';
import withAuth from '@/lib/withAuth';

//====================== Get all sales ===========================================//
export const GET = withAuth(async () => {
   try {
      const sales = await getAllSales();
      return NextResponse.json(sales);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
});

//====================== Create one sale ===========================================//
export const POST = withAuth(async (req) => {
   const saleData = await req.json();

   try {
      const saleID = await createSaleWizard(saleData);
      return NextResponse.json({ message: `Sale id = ${saleID} created successfully ` });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}, ['admin']);

//====================== Delete all sales ===========================================//
export const DELETE = async (req) => {
   // try {
   //    await deleteAllSales();
   //    return NextResponse.json({ message: 'All sales have been deleted.' });
   // } catch (error) {
   //    return NextResponse.json({ message: error.message }, { status: 500 });
   // }
}
