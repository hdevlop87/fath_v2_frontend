"use client"

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import customerSetting from '@/settingsJson/customerSetting.json';
import { CustomerSchema, CustomerFormValues } from '@/types/customer.types';
import useStore from '@/store/dataStore';
import FormButton from './FormButton';
import FieldRenderer from './FieldRenderer';
import { useTranslations } from 'next-intl'; 

const Customers = ({ submit, loading }) => {
    const t = useTranslations(); 
    const formData = useStore((state) => state.formData.customer);

    let checkEmptyForm = formData?.customerID;

    const { fields } = customerSetting;

    const form = useForm<CustomerFormValues>({
        resolver: zodResolver(CustomerSchema),
        defaultValues: formData 
    });

    function onSubmit(values: CustomerFormValues) {
        if (formData && formData.customerID !== '') {
            values.customerID = formData.customerID;
        }

        submit(values);
    }

    return (
        <Form {...form}>
            <h3 className="font-semibold mb-4">{!checkEmptyForm ? t("customer.createNewCustomer") : t("customer.editCustomer")}</h3>
            <form id="customer-form" onSubmit={form.handleSubmit(onSubmit)} className="w-[400px] flex flex-wrap gap-4" >
                {fields.map((fieldData) => (
                    <FieldRenderer
                        key={fieldData.name}
                        control={form.control}
                        fieldData={{
                            ...fieldData,
                            placeholder: t(fieldData.placeholder),
                            label: t(fieldData.label)
                        }}
                    />
                ))}

            </form>
            <div className='flex w-full justify-start gap-2 mt-2'>
                <FormButton loading={loading} title={t('button.submit')} id="customer-form"/>
            </div>
        </Form>
    )
}

export default Customers;
