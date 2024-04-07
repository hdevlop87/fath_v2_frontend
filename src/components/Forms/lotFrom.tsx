"use client"

import React, { useEffect, useMemo } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import lotSetting from '@/settingsJson/lotSetting.json';
import { LotSchema, LotFormValues } from '@/types/lot.types';
import useStore from '@/store/dataStore';
import FormButton from './FormButton';
import FieldRenderer from './FieldRenderer';
import { useTranslations } from 'next-intl';

const Lots = ({ submit, loading }) => {
    const { fields } = lotSetting;
    const t = useTranslations();
    const formData = useStore((state) => state.formData.lot);

    let checkEmptyForm = formData?.lotID;

    const statusValue = formData?.status ? formData.status.toLowerCase() : null;
    const translationKey = statusValue ? `status.${statusValue}` : null;

    const updatedFormData = useMemo(() => ({
        ...formData,
        status: translationKey ? t(translationKey) : null,
    }), [formData]);

    const form = useForm<LotFormValues>({
        resolver: zodResolver(LotSchema),
        defaultValues: updatedFormData
    });

    function onSubmit(values: LotFormValues) {
        const originalStatus = formData?.status; // Get the original status value
        const finalValues = {
            ...values,
            status: originalStatus, // Replace with the original value
            ...(formData?.lotID ? { lotID: formData.lotID } : {}),
        };
        submit(finalValues);
    }

    const updatedFields = fields.map(field => {
        if (field.name === 'status') {
            return {
                ...field,
                items: field.items?.map(item => ({
                    value: item.value,
                    label: t(item.label)
                }))
            };
        }
        return field;
    });

    return (
        <Form {...form}>
            <h3 className="font-semibold ">{!checkEmptyForm ? t("lot.createNewLot") : t("lot.editLot")}</h3>
            <form id="lot-form" onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] flex flex-wrap gap-4" >
                {updatedFields.map((fieldData) => (
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
                <FormButton loading={loading} title={t("button.submit")} id="lot-form" />
            </div>
        </Form>
    )
}

export default Lots;
