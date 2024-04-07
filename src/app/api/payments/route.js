import { createPayment, getAllPayments, deleteAllPayments } from '@/controllers/paymentController';
import { NextResponse } from 'next/server';
import withAuth from '@/lib/withAuth';

//====================== Get all payments ===========================================//
export const GET = withAuth(async () => {
   try {
      const payments = await getAllPayments();
      return NextResponse.json(payments);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
});

//====================== Create one payment ===========================================//
export const POST = withAuth(async (req) => {
   const paymentData = await req.json();

   try {
      const paymentID = await createPayment(paymentData);
      return NextResponse.json({ message: `Payment id = ${paymentID} created successfully ` });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}, ['admin']);

//====================== Delete all payments ===========================================//
export const DELETE = async (req) => {
   // try {
   //    await deleteAllPayments();
   //    return NextResponse.json({ message: 'All payments have been deleted.' });
   // } catch (error) {
   //    return NextResponse.json({ message: error.message }, { status: 500 });
   // }
}
