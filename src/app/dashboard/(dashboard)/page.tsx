'use client'

import {Card,CardContent,CardHeader,CardTitle,} from "@/components/ui/card"
import { useTranslations } from '@/hooks/useTranslations';
import { Overview } from "./overview"
import RecentSales from "./recent-sales"
import ItemsHeader from './itemsHeader'
import useFetchDashData from '@/hooks/subdivision/useFetchDashData';
import Can from '@/components/Can';  

export default function DashboardPage() {

   const t = useTranslations();
   const { dashData, isLoading: isLoadingDash } = useFetchDashData();
   return (
      <Can permission='read_dashData'>
         <div className="flex-1 space-y-4 ">
            <ItemsHeader dashData={dashData} />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
               <Card className="col-span-6 lg:col-span-4">
                  <CardHeader>
                     <CardTitle>{t("dashboard.graphTitle")}</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                     <Overview dashData={dashData} />
                  </CardContent>
               </Card>

               <RecentSales dashData={dashData} />
            </div>
         </div>
      </Can>
   )
}
