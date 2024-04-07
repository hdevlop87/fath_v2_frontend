"use client"

import DataTable from '@/components/DataTable';
import { lotColumns } from './Columns';
import LotFrom from '@/components/Forms/lotFrom'
import { createLot, updateLot, deleteLot, uploadFileLot } from '@/services/lotsApi'
import LotSetting from '@/settingsJson/lotSetting.json';
import { Card } from '@/components/ui/card';
import useFetchLots from '@/hooks/useFetchLots'
import { useTranslations } from 'next-intl';


const { toastMessages, queryKey } = LotSetting;

export default function Lots() {
   const t = useTranslations();
   const { data } = useFetchLots();
   const columns = lotColumns(t);

   const statusesFilter = [
      {
         value: "Available",
         label: t("lot.status.available"),
      },
      {
         value: "Reserved",
         label: t("lot.status.reserved"),
      },
      {
         value: "Ongoing",
         label: t("lot.status.ongoing"),
      },
      {
         value: "Sold",
         label: t("lot.status.sold"),
      },
      {
         value: "Canceled",
         label: t("lot.status.canceled"),
      },
   ]

   const filters = [
      {
         name: "size",
         type: "text",
         placeHolder:'Filtrer par Taille.....'
      },
      {
         name: "status",
         type: "select",
         items:statusesFilter,
         placeHolder:t('lot.statusLabel')
      }
   ]

   return (
      <Card className='p-4 h-full w-full'>
         <DataTable
            data={data}
            columns={columns}
            dataType='lot'
            formComponent={LotFrom}
            apiMethods={{ create: createLot, update: updateLot, delete: deleteLot, uploadFile: uploadFileLot }}
            toastMessages={toastMessages}
            queryKey={queryKey}
            filters={filters}
         />
      </Card>
   )
}