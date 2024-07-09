'use client'

import React from 'react';
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import useFetchPayments from '@/hooks/subdivision/useFetchPaymentsBySaleId';
import useFetchSaleById from '@/hooks/subdivision/useFetchSaleById'
import { useTranslations } from '@/hooks/useTranslations';
import { paymentConfig } from '@/config/paymentsConfig';
import { useSearchParams } from 'next/navigation';
import AgreementButtons from './agreementButtons';
import DataTable from '@/components/DataTable';
import { Label } from '@/components/ui/label';
import { paymentColumns } from '@/app/dashboard/payments/Columns';
import SaleView from './Sale';
import { useSideBarStore } from '@/store/sidebarStore'
import { Separator } from '@/components/ui/separator'

export type SearchParams = {
   saleID?: number;
};

export default function SaleComponent() {

   const t = useTranslations();
   const searchParams = useSearchParams();
   const saleId = searchParams.get('saleID');
   const isMobile = useSideBarStore.use.isMobile();
   const { payments, isLoading: isPaymentsLoading } = useFetchPayments(saleId);
   const { sale, isLoading: isSaleLoading } = useFetchSaleById(saleId);

   if (isSaleLoading || isPaymentsLoading) return <>loading...</>;

   const columns = paymentColumns(t, isMobile);
   const totalPaid = `${t('sale.totalPaidLabel')} = ${sale?.totalVerifiedPayments} Dh`;

   return (
      <div className="flex gap-4 lg:flex-row flex-col h-full w-full ">

         <div className="flex flex-col w-full lg:w-[450px] gap-6" >
            <Label>{t("sale.titleLabel")}</Label>
            <div className="flex flex-grow flex-col gap-12">
               <SaleView sale={sale} />
               <AgreementButtons sale={sale} />
            </div>
         </div>

         <Separator className='w-full h-1 lg:h-full lg:w-1' />

         <div className="flex flex-col  w-full gap-6" >
            <Label>{t("payment.titleLabel")}</Label>
            <div className="flex flex-grow flex-col h-full gap-10">
               <DataTable
                  data={payments || []}
                  columns={columns}
                  filters={paymentConfig.filters}
                  target="payment"
                  showMode={false}
               />
               <Label >{totalPaid}</Label>

            </div>
         </div>
      </div>
   )
}






