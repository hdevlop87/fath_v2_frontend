'use client'
import React, { useState } from 'react';
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card"
import useFetchSale from '@/hooks/useFetchSale';
import DataTable from '@/components/DataTable';
import { paymentColumns } from './Columns'
import PaymentSetting from '@/settingsJson/paymentSetting.json';
import { createPayment, updatePayment, deletePayment } from '@/services/paymentApi'
import PaymentFrom from '@/components/Forms/paymentForm'
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import DialogShowImage from '@/components/DialogShowImage';
import { Label } from '@/components/ui/label';
import { calculateTotalPaid } from '@/lib/utils';
import useStore from '@/store/dataStore';
import SaleView from '@/components/Views/saleView';
import AgreementButtons from './agreementButtons'

export type SearchParams = {
   saleID?: number;
};

export default function SaleComponent() {

   const t = useTranslations();
   const columns = paymentColumns(t);

   const availablePayments = useStore((state) => state.availablePayments);
   const { toastMessages, queryKey } = PaymentSetting;
   const searchParams = useSearchParams();

   const saleID = searchParams.get('saleID');
   const { isLoading, data } = useFetchSale(saleID);

   if (isLoading) return 'Loading...'

   const totalPaid = calculateTotalPaid(availablePayments);

   const statusesFilter = [
      {
         value: "Pending",
         label: t("payment.status.pending"),
      },
      {
         value: "Verified",
         label: t("payment.status.verified"),
      },
      {
         value: "Failed",
         label: t("payment.status.failed"),
      }
   ]

   const filters = [
      {
         name: "status",
         type: "select",
         items:statusesFilter,
         placeHolder:t('payment.statusLabel')
      }
   ]


   return (
      <div className="flex gap-4 h-full w-full mb-4">
         <Card className={cn("flex flex-col w-[400px] h-full ")} > 
            <CardHeader>
               <CardTitle>{t("sale.titleLabel")}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-grow flex-col gap-12">
               <SaleView />
               <AgreementButtons data={data} />
            </CardContent>

         </Card>

         <Card className={cn("flex flex-col flex-grow h-full w-full")} >
            <CardHeader>
               <CardTitle>{t("payment.titleLabel")}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-grow flex-col">
               <DataTable
                  data={data?.payments}
                  dataType='payment'
                  columns={columns}
                  formComponent={PaymentFrom}
                  apiMethods={{ create: createPayment, update: updatePayment, delete: deletePayment }}
                  toastMessages={toastMessages}
                  queryKey={queryKey}
                  filters={filters}
               />
               <Label >{t('sale.totalPaidLabel', { totalPaid: totalPaid })}</Label>

            </CardContent>
         </Card>

         <DialogShowImage />
      </div>
   )
}






