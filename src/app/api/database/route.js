import { NextResponse } from 'next/server';
import { sql, eq } from "drizzle-orm";
import { db } from '@/db';
import { payments, sales, customers, lots, expenses } from '@/db/schema';
import { createSaleWizard } from '@/controllers/saleController';
import { resetAllLots } from '@/controllers/lotController';
import { getAdminHashedPassword } from '@/controllers/userController';
import bcrypt from 'bcryptjs';

import withAuth from '@/lib/withAuth';

export const getAllSales = async () => {
   const result = await db.select({

      sale: {
         lotID: sales.lotID,
         pricePerM2: sales.pricePerM2,
         totalPrice: sales.totalPrice,
         balanceDue: sales.balanceDue,
         paidPercentage: sales.paidPercentage,
         status: sales.status,
         date: sales.date,
      },
      customer: {
         firstName: customers.firstName,
         lastName: customers.lastName,
         phone: customers.phone,
         email: customers.email,
         address: customers.address,
         CIN: customers.CIN,
      },
      payments: sql`(
              SELECT jsonb_agg(jsonb_build_object(
                  'amount', ${payments.amount},
                  'date', ${payments.date},
                  'method', ${payments.method},
                  'status', ${payments.status},
                  'paymentReference', ${payments.paymentReference},
                  'receipt', ${payments.receipt},
                  'notes', ${payments.notes}
              )) FROM ${payments} WHERE ${payments.saleID} = ${sales.saleID}
          )`.as('payments'),

   })
      .from(sales)
      .leftJoin(lots, eq(sales.lotID, lots.lotID))
      .leftJoin(customers, eq(sales.customerID, customers.customerID))
      .orderBy(sales.lotID, 'ASC')
      .execute();

   return result;
};


export const GET = async () => {
   try {
      let sales = await getAllSales();
      return NextResponse.json({ sales }, { status: 200 });

   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
}

//===============================================================================//
export const POST = async (req) => {
   const saleDataArray = await req.json();

   const saleIds = [];
   const errorMessages = [];

   for (const saleData of saleDataArray) {
      try {
         const saleID = await createSaleWizard(saleData);
         saleIds.push(saleID);
      } catch (error) {
         errorMessages.push(error.message);
      }
   }

   if (errorMessages.length === 0) {
      return NextResponse.json({ message: `Sales created successfully`, saleIds });
   } else {
      return NextResponse.json({ errorMessages }, { status: 500 });
   }
};

export const DELETE = async (req) => {

   const truncateQuery = sql`TRUNCATE TABLE ${expenses}, ${payments}, ${sales}, ${customers} RESTART IDENTITY CASCADE`;

   try {
      const { username, password } = await req.json();
      const hashedPassword = await getAdminHashedPassword(username);
      const isValidPassword = bcrypt.compareSync(password, hashedPassword);

      if (!isValidPassword) {
         return NextResponse.json({ message: 'Invalid password' }, { status: 403 });
      }
      await db.execute(truncateQuery);
      await resetAllLots()
      return NextResponse.json({ message: 'Tables have been truncated and reset' }, { status: 200 });
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
};