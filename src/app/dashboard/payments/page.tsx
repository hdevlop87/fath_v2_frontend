"use client"

import useFetchPayments from '@/hooks/subdivision/useFetchPayments'
import { paymentConfig } from '@/config/paymentsConfig';
import DataTable from '@/components/DataTable';
import { paymentColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';
import { useSideBarStore } from '@/store/sidebarStore'
import Can from '@/components/Can';

export default function Payments() {

   const t = useTranslations();
   const isMobile = useSideBarStore.use.isMobile();
   const columns = paymentColumns(t,isMobile);

   const { allPayments, isLoading } = useFetchPayments();

   if (isLoading) return <>loading...</>


   return (
      <Can permission='read_payment'>

         <DataTable
            data={allPayments || []}
            columns={columns}
            filters={paymentConfig.filters}
            target="payment"
            showMode={false} 
         />
      </Can>
   )
}