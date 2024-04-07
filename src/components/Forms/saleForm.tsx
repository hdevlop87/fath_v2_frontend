"use client"

import React, { useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import saleSetting from '@/settingsJson/saleSetting.json';
import { SaleSchema, SaleFormValues } from '@/types/sale.types';
import useStore from '@/store/dataStore';
import FormButton from './FormButton';
import FieldRenderer from './FieldRenderer';
import { useTranslations } from 'next-intl';


const Sales = ({ submit, loading }) => {

    const { fields } = saleSetting;
    const t = useTranslations();
    const saleFormData = useStore((state) => state.formData.sale);
    const customerFormData = useStore((state) => state.formData.customer);
    const lotFormData = useStore((state) => state.formData.lot);
    const availableCustomers = useStore((state) => state.customers);

    let availableLots = useStore((state) => state.availableLots);
    availableLots = availableLots.filter((lot) => lot?.lotRef !== lotFormData?.lotRef);
    availableLots = [lotFormData, ...availableLots];

    const combinedFormData = useMemo(() => ({
        ...saleFormData,
        lotRef: lotFormData ? lotFormData.lotRef : null,
        date: saleFormData?.date ? new Date(saleFormData.date) : null,
        isActif: saleFormData?.status !== 'Canceled',
    }), [saleFormData, customerFormData, lotFormData]);

    const form = useForm<SaleFormValues>({
        resolver: zodResolver(SaleSchema),
        defaultValues: combinedFormData
    });

    const { setValue } = form;

    useEffect(() => {
        for (const key in combinedFormData) {
            setValue(key as any, combinedFormData[key], { shouldDirty: true, shouldValidate: true });
        }
    }, [combinedFormData, setValue]);

    const selectedLotRef: any = form.watch('lotRef');
    const priceInputValue: any = form.watch('pricePerM2');

    const lotRefItems = availableLots.map((lot: any) => lot?.lotRef);
    const selectedLot: any = availableLots.find(lot => lot?.lotRef === selectedLotRef);
    const selectedLotSize: number = selectedLot && selectedLot.size ? selectedLot.size : 0;
    const totalLotPrice: number = selectedLot && priceInputValue ? selectedLot.size * parseFloat(priceInputValue) : 0;

    const customerItems = availableCustomers.map((customer: any) => ({
        label: `${customer.firstName} ${customer.lastName}`,
        value: customer.customerID
    }));


    const updatedFields = fields.map(field => {
        if (field.name === 'lotRef') {
            return {
                ...field,
                items: lotRefItems
            };
        }
        else if (field.name === 'customerID') {
            return {
                ...field,
                items: customerItems
            };
        }

        return field;
    });

    function onSubmit(values: SaleFormValues) {

        const finalValues:any = {
            ...values,
            ...(saleFormData?.saleID ? { saleID: saleFormData.saleID } : {}),
            status: values.isActif ? 'Ongoing' : 'Canceled',
        };
        delete finalValues.isActif
        submit(finalValues);
    }

    return (
        <div className='flex flex-col gap-4 w-[300px] justify-between '>
            <Form {...form} >
                <form id="sale-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4" >
                    {updatedFields.map((fieldData) => (
                        <FieldRenderer
                            key={fieldData.name}
                            control={form.control}
                            fieldData={{
                                ...fieldData,
                                placeholder: t(fieldData.placeholder),
                                label: fieldData.label ? t(fieldData.label) : ''
                            }}
                        />
                    ))}
                    <div className='w-full flex flex-col gap-5 mt-3 text-md'>
                        <Label >{t('sale.lotSizeLabel', { size: selectedLotSize })}</Label>
                        <Label >{t('sale.totalPriceLabel', { price: totalLotPrice })}</Label>
                    </div>
                </form>
            </Form>

            <div className='flex w-full justify-start gap-2 mt-8'>
                <FormButton loading={loading} title='Modifier Achat' icon='bx:edit' id="sale-form" />
            </div>

        </div>
    )
}

export default Sales;
















    // const statusValue = saleFormData?.status ? saleFormData.status.toLowerCase() : null;
    // const translationKey = statusValue ? `status.${statusValue}` : null;

        // status: translationKey ? t(translationKey) : null,













//const availablePayments = useStore((state) => state.availablePayments);
    // const totalPaid = calculateTotalPaid(availablePayments);
    // const paidPercentage = calculatePaidPercentage(totalLotPrice, totalPaid);
    // const Outstanding = calculateBalanceDue(totalLotPrice, availablePayments);
    // const roundedPaidPercentage = parseFloat(paidPercentage.toFixed(2));