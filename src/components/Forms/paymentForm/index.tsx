"use client"

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTranslations } from '@/hooks/useTranslations';
import { paymentConfig, PaymentType } from '@/config/paymentsConfig'
import { useSearchParams } from 'next/navigation';
import { usePromptStore } from '@/store/promptStore';
import useFetchLots from '@/hooks/subdivision/useFetchLots';

const Payments = ({ target, handleSubmit }) => {

  const { allLotsRef } = useFetchLots();
  const t = useTranslations();
  const initialValues = usePromptStore.use.initialValues();
  const searchParams = useSearchParams();
  const saleId = searchParams.get('saleID') || initialValues?.saleId || null;

  const fields = !saleId
    ? [{ name: 'lotRef', type: 'select', placeholder: 'lot.lotRefPlaceholder', label: 'lot.lotRefLabel', items: allLotsRef }, ...paymentConfig.fields]
    : paymentConfig.fields;

  const schema = paymentConfig.baseSchema.refine((data) => saleId || data.lotRef, {
    message: "lotRef is required when saleId is null.",
    path: ["lotRef"],
  });

  const form = useForm<PaymentType>({
    resolver: zodResolver(schema),
    defaultValues: (initialValues ? initialValues : paymentConfig.defaultValues)
  });

  const onSubmit = (data) => {
    const mergedData = { ...data, saleId };
    handleSubmit(mergedData);
  };

  return (
    <Form {...form}>
      <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-[300px] flex flex-col gap-4" >
        {fields.map((fieldData: any) => (
          <div key={fieldData.name} className="flex-shrink-0 ">
            <FormField
              control={form.control}
              name={fieldData.name}
              render={({ field }) => (
                <FormItem>
                  <AutoInput
                    type={fieldData.type}
                    placeholder={t(fieldData.placeholder)}
                    field={field}
                    label={t(fieldData.label)}
                    items={fieldData.items}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
      </form>
    </Form>
  )
}

export default Payments;
