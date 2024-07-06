"use client"

import useFetchCustomers from '@/hooks/subdivision/useFetchCustomers'
import { customerConfig } from '@/config/customerConfig';
import DataTable from '@/components/DataTable';
import { customerColumns } from './Columns';
import { Card } from '@/components/ui/card';
import { useTranslations } from '@/hooks/useTranslations';

export default function Customers() {

   const t = useTranslations();
   const columns = customerColumns(t);

   const { allCustomers, isLoading } = useFetchCustomers();
   if (isLoading) return <>loading...</>

   return (
      <DataTable
         data={allCustomers || []}
         columns={columns}
         filters={customerConfig.filters}
         target="customer"
         mode='cards'
      />
   )
}