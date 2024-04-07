import { customerExists} from '@/controllers/customerController';
import { NextResponse } from 'next/server';


//====================== Create one customer ===========================================//
export const POST = async (req) => {
   const customerData = await req.json();

   try {
      const resp = await customerExists(customerData);
      return NextResponse.json(resp);

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}

