"use client"

import useFetchCustomers from '@/hooks/subdivision/useFetchCustomers'
import { customerConfig } from '@/config/customerConfig';
import DataTable from '@/components/DataTable';
import { customerColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';
import Can from '@/components/Can';

export default function Customers() {

   const t = useTranslations();
   const columns = customerColumns(t);

   const { allCustomers, isLoading } = useFetchCustomers();
   if (isLoading) return <>loading...</>

   return (
      <Can permission='read_customer'>
         <DataTable
            data={allCustomers || []}
            columns={columns}
            filters={customerConfig.filters}
            target="customer"
            mode='cards'
         />
      </Can>
   )
}