'use client'

import React from 'react';
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";
import useFetchPayments from '@/hooks/subdivision/useFetchPaymentsBySaleId';
import useFetchSaleById from '@/hooks/subdivision/useFetchSaleById'
import { useTranslations } from '@/hooks/useTranslations';
import {paymentConfig} from '@/config/paymentsConfig';
import { useSearchParams } from 'next/navigation';
import AgreementButtons from './agreementButtons';
import DataTable from '@/components/DataTable';
import { Label } from '@/components/ui/label';
import { paymentColumns } from './Columns';
import SaleView from './Sale';

export type SearchParams = {
   saleID?: number;
};

export default function SaleComponent() {

   const t = useTranslations();
   const searchParams = useSearchParams();
   const saleId = searchParams.get('saleID');

   const { payments, isLoading: isPaymentsLoading } = useFetchPayments(saleId);
   const { sale, isLoading: isSaleLoading } = useFetchSaleById(saleId);
 
   if (isSaleLoading || isPaymentsLoading) return <>loading...</>;

   const columns = paymentColumns(t);
   const totalPaid = `${t('sale.totalPaidLabel')} = ${sale?.totalVerifiedPayments} Dh`;

   return (
      <div className="flex gap-4 h-full w-full mb-4">
         <Card className={cn("flex flex-col w-[500px] h-full ")} >
            <CardHeader>
               <CardTitle>{t("sale.titleLabel")}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-grow flex-col gap-12">
               <SaleView sale={sale} />
               <AgreementButtons sale={sale} />
            </CardContent>

         </Card>

         <Card className={cn("flex flex-col flex-grow h-full w-full")} >
            <CardHeader>
               <CardTitle>{t("payment.titleLabel")}</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-grow flex-col h-full gap-10">
               <DataTable
                  data={payments || []}
                  columns={columns}
                  filters={paymentConfig.filters}
                  target="payment"
                  showMode={false}
               />
               <Label >{totalPaid}</Label>

            </CardContent>
         </Card>
      </div>
   )
}






