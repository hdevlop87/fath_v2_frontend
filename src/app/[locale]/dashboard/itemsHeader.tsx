
'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icon } from '@iconify/react';
import useStore from '@/store/dataStore';
import { formatCommas } from "@/lib/utils";

const itemsHeader = () => {

   const financialData = useStore(state => state.financialData);

   const cardData = [
      {
         id: 'totalPayments',
         title: "Ventes Brutes",
         icon: "mdi:currency-usd"
      },
      {
         id: 'totalExpenses',
         title: "Dépenses Totales",
         icon: "game-icons:pay-money"
      },
      {
         id: 'netAmount',
         title: "Bénéfice Net",
         icon: "healthicons:money-bag"
      },
      {
         id: 'totalSalesCount',
         title: "Ventes",
         icon: "tabler:sum"
      }
   ];



   return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         {cardData.map((card, index) => (
            <Card key={index}>
               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-md font-medium">
                     {card.title}
                  </CardTitle>
                  <Icon icon={card.icon} className="h-7 w-7 text-muted-foreground" />
               </CardHeader>
               <CardContent>
                  <p className="text-2xl font-bold">
                     {card.id === 'totalSalesCount' ? `+ ${financialData[card.id]}` : `${formatCommas(financialData[card.id])} DHS`}
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