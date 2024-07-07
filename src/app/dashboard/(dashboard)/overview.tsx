'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {formatCommas} from '@/lib/utils'


export function Overview({dashData}) {

  const paymentsByYear = dashData?.verifiedPaymentsByYear;

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={paymentsByYear}>
        <XAxis
          dataKey="paymentYear"
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
        <Bar dataKey="totalPayments" fill="#F99929" radius={[4, 4, 0, 0]} maxBarSize={30}/>
      </BarChart>
    </ResponsiveContainer>
  );
}