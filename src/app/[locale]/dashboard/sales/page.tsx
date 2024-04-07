"use client"
import React from 'react';
import DataTable from '@/components/DataTable';
import { saleColumns } from './Columns';
import { createSale, updateSale, deleteSale } from '@/services/salesApi'
import SaleSetting from '@/settingsJson/saleSetting.json';
import { Card } from '@/components/ui/card';
import wizardSale from '@/components/wizardSale'
import useFetchSales from '@/hooks/useFetchSales'

import { useTranslations } from 'next-intl';
import SaleForm from '@/components/Forms/saleForm'

const { toastMessages, queryKey } = SaleSetting;

export default function Sales() {
   
   const t = useTranslations();
   const { data } = useFetchSales();
   const columns = saleColumns(t);

   const statusesFilter = [
      {
         value: "Initiated",
         label: t("sale.status.initiated"),
      },
      {
         value: "Ongoing",
         label: t("sale.status.ongoing"),
      },
      {
         value: "Completed",
         label: t("sale.status.completed"),
      },
      {
         value: "Canceled",
         label: t("sale.status.canceled"),
      }
   ]

   const filters = [
      {
         name: "customerName",
         type: "text",
         placeHolder:'Filtrer par Client.....'
      },
      {
         name: "status",
         type: "select",
         items:statusesFilter,
         placeHolder:t('sale.statusLabel')
      }
   ]

   return (
      <Card className='p-4 h-full w-full'>
         <DataTable
            data={data}
            dataType='sale'
            columns={columns}
            formComponent={wizardSale}
            editFormComponent={SaleForm}
            apiMethods={{ create: createSale, update: updateSale, delete: deleteSale }}
            toastMessages={toastMessages}
            queryKey={queryKey}
            filters={filters}
         />
      </Card>
   )
}