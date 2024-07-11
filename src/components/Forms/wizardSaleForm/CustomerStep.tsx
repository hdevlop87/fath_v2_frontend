"use client"

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTranslations } from '@/hooks/useTranslations';
import { customerConfig, CustomerType } from '@/config/customerConfig'
import useFormStore from './formStore';

const Customers = ({  id, onSubmit }) => {

  const t = useTranslations();
  const { getFormData } = useFormStore();
  const formData = getFormData('customer');

  const form = useForm<CustomerType>({
    resolver: zodResolver(customerConfig.schema),
    defaultValues: { ...customerConfig.defaultValues, ...formData },
  });

  return (
    <>
      <Form {...form}>
        <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4" >
          {customerConfig.fields.map((fieldData: any) => (
            <div key={fieldData.name} style={{ width: fieldData.width || '100%' }} className="flex-shrink-0 ">
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

    </>
  )
}

export default Customers;
