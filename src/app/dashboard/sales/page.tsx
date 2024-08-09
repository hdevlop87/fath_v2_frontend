"use client"

import useFetchSales from '@/hooks/subdivision/useFetchSales'
import { saleConfig } from '@/config/saleConfig';
import DataTable from '@/components/DataTable';
import { saleColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';
import { useSideBarStore } from '@/store/sidebarStore'
import Can from '@/components/Can';

export default function Sales() {

   const t = useTranslations();
   const isMobile = useSideBarStore.use.isMobile();
   const columns = saleColumns(t, isMobile);

   const { data, isLoading } = useFetchSales();

   if (isLoading) return <>loading...</>

   return (
      <Can permission='read_sale'>
         <DataTable
            data={data || []}
            columns={columns}
            filters={saleConfig.filters}
            target="sale"
            showMode={false}
         />
      </Can>
   )
} 