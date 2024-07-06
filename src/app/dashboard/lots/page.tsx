"use client"

import useFetchLots from '@/hooks/subdivision/useFetchLots'
import { lotConfig } from '@/config/lotConfig';
import DataTable from '@/components/DataTable';
import { lotColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';

export default function Lots() {

   const t = useTranslations();
   const columns = lotColumns(t);

   const { data, isLoading } = useFetchLots();
   if (isLoading) return <>loading...</>

   return (
      <DataTable
         data={data || []}
         columns={columns}
         filters={lotConfig.filters}
         target="lot"
         showMode={false}
      />
   )
}