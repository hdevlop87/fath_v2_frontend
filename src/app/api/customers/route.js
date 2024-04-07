import { createCustomer, getAllCustomers, deleteAllCustomers } from '@/controllers/customerController';
import { NextResponse } from 'next/server';
import withAuth from '@/lib/withAuth';

//====================== Get all Customers ===========================================//
export const GET = withAuth(async () => {
   try {
      const Customers = await getAllCustomers();

      return NextResponse.json(Customers);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
});
 
//====================== Create one customer ===========================================//
export const POST = withAuth(async (req) => {
   const customerData = await req.json();

   try {
      const customerID = await createCustomer(customerData);
      return NextResponse.json({ message: `Customer id = ${customerID} created successfully ` });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}, ['admin']);

//====================== Delete all Customers ===========================================//
export const DELETE = async (req) => {
   try {
      await deleteAllCustomers();
      return NextResponse.json({ message: 'All Customers have been deleted.' });
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}