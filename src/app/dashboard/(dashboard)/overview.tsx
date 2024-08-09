'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { formatCommas } from '@/lib/utils';
import { useTranslations } from "@/hooks/useTranslations";

export function Overview({ dashData }) {
  const paymentsByYear = dashData?.verifiedPaymentsByYear || [];
  const expensesByYear = dashData?.expensesByYear || [];
  const t = useTranslations();
  // Combine the data into a single array, ensuring all years are included
  const years = new Set([...paymentsByYear.map(p => p.paymentYear), ...expensesByYear.map(e => e.expenseYear)]);
  const combinedData = Array.from(years).map(year => {
    const payment = paymentsByYear.find(p => p.paymentYear === year) || { totalPayments: 0 };
    const expense = expensesByYear.find(e => e.expenseYear === year) || { totalExpenses: 0 };
    return {
      year,
      totalPayments: payment.totalPayments,
      totalExpenses: expense.totalExpenses
    };
  });

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={combinedData}>
        <XAxis
          dataKey="year"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${formatCommas(value)}`}
        />
        <Tooltip formatter={(value) => formatCommas(value)} />
        <Legend />
        <Bar dataKey="totalPayments" fill="#F99929" radius={[4, 4, 0, 0]} maxBarSize={30} name={t("sidebar.payments")} />
        <Bar dataKey="totalExpenses" fill="#82ca9d" radius={[4, 4, 0, 0]} maxBarSize={30} name={t("sidebar.expenses")} />
      </BarChart>
    </ResponsiveContainer>
  );
}
