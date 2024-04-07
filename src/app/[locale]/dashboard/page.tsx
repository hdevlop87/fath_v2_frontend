'use client'

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card"

import { Overview } from "./overview"
import RecentSales from "./recent-sales"
import ItemsHeader from './itemsHeader'

export default function DashboardPage() {

   return (
      <>
         <div className="flex-1 space-y-4 ">
            <ItemsHeader />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
               <Card className="col-span-4">
                  <CardHeader>
                     <CardTitle>Aperçu</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                     <Overview />
                  </CardContent>
               </Card>
               <Card className="col-span-3">
                  <CardHeader>
                     <CardTitle>Ventes à Faible Revenu</CardTitle>
                     <CardDescription>
                        Répartition des Ventes à Faible Rendement.
                     </CardDescription>
                  </CardHeader>
                  <CardContent>
                     <RecentSales />
                  </CardContent>
               </Card>
            </div>
         </div>
      </>
   )
}