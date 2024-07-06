'use client'

import React from 'react';
import { lotConfig, LotType } from '@/config/lotConfig';
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from '@/components/Forms/FormField'
import { usePromptStore } from '@/store/promptStore';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const LotForm = ({ target, handleSubmit }) => {

   const initialValues = usePromptStore.use.initialValues();

   const form = useForm<LotType>({
      resolver: zodResolver(lotConfig.schema),
      defaultValues: initialValues || lotConfig.defaultValues
   });

   const onSubmit = (data) => {
      handleSubmit(data);
   };

   return (
      <div className='flex flex-col gap-4 w-[400px] '>
         <Form {...form}>
            <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               <div className='flex flex-col w-full gap-6 h-full'>
                  {lotConfig.fields.map((fieldData: any) => (
                     <FormField
                        key={fieldData.name}
                        control={form.control}
                        fieldData={fieldData}
                     />
                  ))}
               </div>
            </form>
         </Form>
      </div>
   )
}

export default LotForm;