"use client"

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useTranslations } from '@/hooks/useTranslations';
import { paymentConfig, PaymentType } from '@/config/paymentsConfig'
import useFormStore from './formStore';


const Payments = ({ id, onSubmit }) => {

   const t = useTranslations();
   const { getFormData } = useFormStore();
   const formData = getFormData('payment');

   const form = useForm<PaymentType>({
      resolver: zodResolver(paymentConfig.baseSchema),
      defaultValues: { ...paymentConfig.defaultValues, ...formData },
   });


   return (
      <Form {...form}>
         <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4" >
            {paymentConfig.fields.map((fieldData: any) => (
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
