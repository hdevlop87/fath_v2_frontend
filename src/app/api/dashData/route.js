import { NextResponse } from 'next/server';
import { sql, eq } from "drizzle-orm";
import { db } from '@/db';
import { payments, sales, expenses, customers, lots } from '@/db/schema';
import { formatNumber } from "@/lib/utils";
import withAuth from '@/lib/withAuth';

const getSalesWithVerifiedPayments = async () => {
   const totalVerifiedPayments = sql`SUM(CASE WHEN ${payments.status} = 'Verified' THEN ${payments.amount} ELSE 0 END)`;

   const result = await db.select({
      saleID: sales.saleID,
      lotRef: lots.lotRef,
      customerName: sql`${customers.firstName} || ' ' || ${customers.lastName}`,
      totalVerifiedPayments,
      paidPercentage: sales.paidPercentage
   })
      .from(sales)
      .leftJoin(lots, eq(sales.lotID, lots.lotID))
      .leftJoin(customers, eq(sales.customerID, customers.customerID))
      .leftJoin(payments, eq(sales.saleID, payments.saleID))
      .groupBy([
         sales.saleID,
         lots.lotRef,
         customers.firstName,
         customers.lastName,
         sales.paidPercentage
      ])
      .having(sql`${totalVerifiedPayments} > 0`)
      .orderBy(sales.paidPercentage, 'ASC')
      .limit(6)
      .execute();

   return result;
};

const fetchFinancialData = async () => {

   const [{ total_payments }] = await db.select({
      total_payments: sql`COALESCE(SUM(amount), 0)`
   }).from(payments).where(eq(payments.status, 'Verified'));

   const [{ total_expenses }] = await db.select({
      total_expenses: sql`COALESCE(SUM(amount), 0)` 
   }).from(expenses);

   const [{ total_sales_count }] = await db.select({
      total_sales_count: sql`COUNT(*)`
   }).from(sales);

   return {
      totalPayments: formatNumber(total_payments),
      totalExpenses: formatNumber(total_expenses),
      netAmount: total_payments - total_expenses,
      totalSalesCount: total_sales_count,
   };
}

const getPaymentsByYear = async () => {
   const totalPayments = sql`SUM(amount)`;
   const paymentYear = sql`DATE_PART('year', date)`;

   const result = await db.select({
      paymentYear,
      totalPayments
   })
      .from(payments)
      .groupBy(paymentYear)
      .orderBy(paymentYear)
      .execute();

   result.forEach((row) => {
      row.totalPayments = formatNumber(row.totalPayments);
   });

   return result;
};

export const GET = withAuth(async () => {
   try {
      let sales = await getSalesWithVerifiedPayments();
      let financialData = await fetchFinancialData();
      let paymentsByYear = await getPaymentsByYear();

      

      return NextResponse.json({ financialData, sales, paymentsByYear }, { status: 200 });


   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
   }
});
 

//====================================== Create one customer =========================================//
export const POST = async (req) => {

}