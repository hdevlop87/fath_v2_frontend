
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from '@iconify/react';
import { formatCommas } from "@/lib/utils";
import { useTranslations } from '@/hooks/useTranslations';

const itemsHeader = ({dashData}) => {

   const financialData = dashData?.financialData;
   const t = useTranslations();

   const cardData = [
      {
         id: 'totalVerifiedPayments',
         title: "dashboard.grossSales",
         icon: "mdi:currency-usd"
      },
      {
         id: 'totalExpenses',
         title: "dashboard.totalExpenses", 
         icon: "game-icons:pay-money"
      },
      {
         id: 'netAmount',
         title: "dashboard.netAmount",
         icon: "healthicons:money-bag"
      },
      {
         id: 'totalSalesCount',
         title: "dashboard.salesCount",
         icon: "tabler:sum"
      }
   ];



   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {cardData.map((card, index) => (
            <Card key={index}>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                     {t(card.title)}
                  </CardTitle>
                  <Icon icon={card.icon} className="h-7 w-7 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <p className="text-2xl font-bold">
                     {card.id === 'totalSalesCount' ? `+ ${financialData?.[card.id]}` : `${formatCommas(financialData?.[card.id])} DHS`}
                  </p>
                  <p className="text-xs text-muted-foreground">
                  </p>
               </CardContent>
            </Card>
         ))}
      </div>
   );
}

export default itemsHeader