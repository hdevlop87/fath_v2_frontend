"use client"

import useFetchPayments from '@/hooks/subdivision/useFetchPayments'
import { paymentConfig } from '@/config/paymentsConfig';
import DataTable from '@/components/DataTable';
import { paymentColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';

export default function Payments() {

   const t = useTranslations();
   const columns = paymentColumns(t);

   const { allPayments, isLoading } = useFetchPayments();
   if (isLoading) return <>loading...</>

   return (
      <DataTable
         data={allPayments || []}
         columns={columns}
         filters={paymentConfig.filters}
         target="payment"
         showMode={false}
      />
   )
}