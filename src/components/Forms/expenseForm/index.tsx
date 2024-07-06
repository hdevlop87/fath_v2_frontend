'use client'

import React from 'react';
import { expenseConfig, ExpenseType } from '@/config/expenseConfig';
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from '@/components/Forms/FormField'
import { usePromptStore } from '@/store/promptStore';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const ExpenseForm = ({ target, handleSubmit }) => {

   const initialValues = usePromptStore.use.initialValues();

   const form = useForm<ExpenseType>({
      resolver: zodResolver(expenseConfig.schema),
      defaultValues: initialValues || expenseConfig.defaultValues
   });

   const onSubmit = (data) => {
      handleSubmit(data);
   }; 

   return (
      <div className='flex flex-col gap-4 w-[400px] '>
         <Form {...form}>
            <form id={`form-${target}`}  onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               <div className='flex flex-col w-full gap-6 h-full'>
                  {expenseConfig.fields.map((fieldData: any) => (
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

export default ExpenseForm;