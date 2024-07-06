'use client'

import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

import { Overview } from "./overview"
import RecentSales from "./recent-sales"
import ItemsHeader from './itemsHeader'
import useFetchDashData from '@/hooks/subdivision/useFetchDashData';

export default function DashboardPage() {


   const { dashData, isLoading: isLoadingDash } = useFetchDashData();

   return (
      <>
         <div className="flex-1 space-y-4 ">
            <ItemsHeader dashData={dashData } />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
               <Card className="col-span-4">
                  <CardHeader>
                     <CardTitle>Aperçu</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                     <Overview dashData={dashData} />
                  </CardContent>
               </Card>

               <RecentSales dashData={dashData} />

            </div>
         </div>
      </>
   )
}