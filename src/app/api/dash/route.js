import { createCustomer, getAllCustomers } from '@/controllers/customerController';
import { NextResponse } from 'next/server';

//====================== Get all Customers ===========================================//
export const GET = async () => {
   try {
      const Customers = await getAllCustomers();

      return NextResponse.json(Customers);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}

//====================== Create one customer ===========================================//
export const POST = async (req) => {
  
}
