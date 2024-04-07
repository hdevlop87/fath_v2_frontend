"use client"

import React from 'react';
import useStore from '@/store/dataStore';
import FieldRenderer from './FieldRenderer';
import { calculateBalanceDue, calculatePaidPercentage, calculateTotalPaid } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator'
import { format } from "date-fns"

const Sales = () => {

    const t = useTranslations();
    const saleFormData = useStore((state) => state.formData.sale);
    const customerFormData = useStore((state) => state.formData.customer);
    const lotFormData = useStore((state) => state.formData.lot);

    const customerName = `${customerFormData?.firstName} ${customerFormData?.lastName}`;
    const date = saleFormData?.date && format(new Date(saleFormData?.date), "PPP")
    const status = t(`sale.status.${saleFormData?.status.toLowerCase()}`);
    const pricePerM2 = saleFormData?.pricePerM2;

    const formData = {
        ...customerFormData,
        ...lotFormData,
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
                <Label >{t('sale.lotSizeLabel', { size: lotFormData?.size })}</Label>
                <Label >{t('sale.totalPriceLabel', { price: saleFormData?.totalPrice })}</Label>

                <Separator className='w-52 h-1' />
                <Label >{t('sale.balanceDueLabel', { due: saleFormData?.balanceDue })}</Label>
                <Label >{t('sale.settledPriceLabel', { percentage: saleFormData?.paidPercentage })}</Label>
            </div>

        </div>
    )
}

export default Sales;
