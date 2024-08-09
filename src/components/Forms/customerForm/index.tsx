'use client';

import React, { useState } from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { customerConfig, CustomerType } from '@/config/customerConfig';
import { useTranslations } from '@/hooks/useTranslations';
import { usePromptStore } from '@/store/promptStore';
import CustomerAvatar from './customerAvatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const CustomerForm = ({ target, handleSubmit }) => {

   const t = useTranslations();
   const initialValues = usePromptStore.use.initialValues();
   const [avatarImage, setAvatarImage] = useState(null);

   const isCreate = !initialValues || !initialValues.customerId;

   const form = useForm<CustomerType>({
      resolver: zodResolver(customerConfig.schema),
      defaultValues: isCreate ? customerConfig.defaultValues : initialValues
   });

   const onSubmit = async (data) => {
      const customerData = {
         ...data,
         avatarImage,
      };
      handleSubmit(customerData);
   };

   return (
      <div className='flex flex-col gap-4 w-[500px] '>
         <Form {...form}>
            <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               
               <div className='flex w-full gap-6 h-full'>
                  <div className='flex w-44 justify-center  h-52'>
                     <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                           <FormItem className='w-full'>
                              <Label className='text-sm font-medium'>Photo</Label>
                              <CustomerAvatar field={field} onImageChange={(avatarImage) => setAvatarImage(avatarImage)} />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Separator orientation="vertical" className='h-92 w-[1.5px]' />

                  <div className='flex flex-col flex-1 space-y-6'>
                     {customerConfig.fields.map((fieldData: any) => {
                        return (
                           <FormField
                              key={fieldData.name}
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
                                       note={fieldData.note}
                                    />
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        )
                     })}
                  </div>
               </div>
            </form>
         </Form>
      </div>
   )
}

export default CustomerForm;
