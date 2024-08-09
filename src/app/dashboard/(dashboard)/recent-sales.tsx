
'use client'

import { Avatar, AvatarFallback, } from "@/components/ui/avatar"
import { formatNumber } from '@/lib/utils'
import { formatCommas } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslations } from '@/hooks/useTranslations';

function Sale({ fallbackText, name, data, amount }) {
  return (
    <div className="flex items-center w-full">
      <Avatar className="h-9 w-9 ">
        <AvatarFallback className=" bg-gray-200">{fallbackText}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{name}</p>
        <p className="text-sm text-muted-foreground">{data}</p>
      </div>
      <div className="ml-auto font-medium">{formatCommas((amount))}</div>
    </div>
  );
}

export default function RecentSales({dashData}) {

  const t = useTranslations();
  const lowPercentSales = dashData?.salesLowestVerifiedPayments;

  return (
    <Card className="col-span-6 pb-20 lg:col-span-3 ">
      <CardHeader>
        <CardTitle>{t("dashboard.lowPercentSalesTitle")}</CardTitle>
        <CardDescription>
        {t("dashboard.lowPercentSalesSubtitle")}
        </CardDescription>
      </CardHeader>
      <CardContent>

        <div className="space-y-8 w-full">
          {lowPercentSales ? (
            lowPercentSales.map((sale, index) => (
              <Sale
                key={index}
                fallbackText={sale.customerName.split(" ").map(n => n[0]).join("")}
                name={sale.customerName}
                data={`Lot:${sale.lotRef},  Payer:${sale.paidPercentage}%`}
                amount={`+${sale.totalVerifiedPayments}`}
              />
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}