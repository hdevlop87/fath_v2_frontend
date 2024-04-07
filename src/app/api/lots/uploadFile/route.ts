import { bulkInsertLots } from '@/server/controllers/lotController';
import { NextRequest, NextResponse } from "next/server";
import withAuth from '@/lib/withAuth';

//====================== Create one lot ===========================================//
export const POST = withAuth(async (req:NextRequest) => {
   try {
      const fileData = await req.json();
      await bulkInsertLots(fileData);
      return NextResponse.json({ message: `Lots created successfully ` });
   } catch (error) {

      return NextResponse.json({ message: error?.message }, { status: 500 });
   }
}, ['admin']);
