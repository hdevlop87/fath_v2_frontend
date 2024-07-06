"use client"

import React, { useEffect, useState } from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import paymentSetting from '@/settingsJson/paymentSetting.json';
import { PaymentSchema, PaymentFormValues } from '@/types/payment.types';
import useStore from '@/store/dataStore';
const { fields } = paymentSetting;
import { useTranslations } from '@/hooks/useTranslations';
import { ReloadIcon } from "@radix-ui/react-icons";


const Payments = ({ submit, back, loading }) => {
   const t = useTranslations();
   const formData = useStore((state) => state.formData.payment);
   const setPaymentData = useStore((state) => state.setPaymentData);

   const form = useForm<PaymentFormValues>({
      resolver: zodResolver(PaymentSchema),
      defaultValues: formData
   });


   function onSubmit(values: PaymentFormValues) {
      setPaymentData(values);
      submit();
   }

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4" >
            {fields.map((fieldData: any) => (
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

            <div className='flex w-full justify-end gap-2'>
               <Button onClick={back} variant="outline" className='mt-2 gap-1'>
                  Back
               </Button>
               <Button type="submit" className='mt-2 gap-1 '>
                  {loading ?
                     <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please Wait... </> : <> {t("button.submit")} </>
                  }
               </Button>

            </div>
         </form>
      </Form>
   )
}

export default Payments;
