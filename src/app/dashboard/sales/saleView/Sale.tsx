"use client"

import React from 'react';
import FieldRenderer from './FieldRenderer';
import { useTranslations } from '@/hooks/useTranslations';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator'
import {formatCommas, formatDate} from '@/lib/utils'

const Sales = ({sale}) => {

    const t = useTranslations();

    const customerName = sale?.customerName;
    const date = formatDate(sale?.date);
    const status = t(`sale.status.${sale?.status}`);
    const pricePerM2 = sale?.pricePerM2;
    const lotRef = sale?.lotRef;

    const formData = {
        lotRef,
        pricePerM2,
        status,
        customerName,
        date
    };

    const updatedFields = [
        {
            "name": "customerName",
            "label": "sale.customerNameLabel",
        },
        {
            "name": "lotRef",
            "label": "sale.lotRefLabel",
        },
        {
            "name": "pricePerM2",
            "label": "sale.pricePerM2Label",
        },
        {
            "name": "date",
            "label": "sale.dateLabel",
        },
        {
            "name": "status",
            "label": "sale.statusLabel",
        }
    ]

    const remainingTo80Percent = (0.80 * sale?.totalPrice) - sale?.totalVerifiedPayments;


    return (
        <div className='flex flex-col gap-4 w-full  '>
            <div id="sale-form" className="flex flex-wrap gap-4" >
                {updatedFields.map((fieldData) => (
                    <FieldRenderer
                        key={fieldData.name}
                        fieldData={fieldData}

                        formData={formData}
                    />
                ))}
            </div>

            

            <div className='w-full flex flex-col gap-5 mt-4 text-md'>
                <Label >{t('sale.lotSizeLabel')} : {sale?.size} m2</Label>
                <Label >{t('sale.totalPriceLabel')}: {formatCommas(sale?.totalPrice)} Dh</Label>

                <Separator className='w-52 h-1' />
                <Label >{t('sale.balanceDueLabel')} : {formatCommas(sale?.balanceDue)} Dh</Label>
                <Label >{t('sale.remainingTo80Percent')} : {formatCommas(remainingTo80Percent)} Dh</Label>
                <Label >{t('sale.settledPriceLabel')}: {sale?.paidPercentage} %</Label>
            </div>

        </div>
    )
}

export default Sales;
