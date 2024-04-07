"use client"

import React, { useMemo } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import expenseSetting from '@/settingsJson/expenseSetting.json';
import { ExpenseSchema, ExpenseFormValues } from '@/types/expense.types';
import useStore from '@/store/dataStore';
import FormButton from './FormButton';
import FieldRenderer from './FieldRenderer';
import { useTranslations } from 'next-intl';
import { resizeImage } from '@/lib/utils';
import { sendFile } from '@/lib/utils';

const Expenses = ({ submit, loading }) => {
   const t = useTranslations();
   const { fields } = expenseSetting;
   const expense = useStore((state) => state.formData.expense);
   const customer = useStore((state) => state.formData.customer);
   const updatedData = useMemo(() => ({
      ...expense,
      date: expense?.date ? new Date(expense.date) : null,
   }), [expense]);


   let checkEmptyForm = expense?.expenseID;

   const form = useForm<ExpenseFormValues>({
      resolver: zodResolver(ExpenseSchema),
      defaultValues: updatedData
   });

   async function onSubmit(values: ExpenseFormValues) {
      const finalValues = {
         ...values,
         ...(expense?.expenseID ? { expenseID: expense.expenseID } : {}),
      };

      if (finalValues.paymentImage && finalValues.paymentImage.name) {
         const fileName = customer.CIN + '_expense_' + values.paymentImage.name;
         const resizedFile: any = await resizeImage(values.paymentImage, 800, 800);
         await sendFile(resizedFile, fileName);
         finalValues.paymentImage = `/api/fileUpload/${fileName}`
      }

      submit(finalValues);
   }

   const updatedFields = useMemo(() => {
      return fields.map(field => {
         if (field.name === 'type') {
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
   }, [fields, t]);

   return (
      <div className='flex flex-col gap-4 w-[350px] justify-between '>
         <Form {...form}>
            <h3 className="font-semibold ">{!checkEmptyForm ? t("expense.createNewExpense") : t("expense.editExpense")}</h3>
            <form id="expense-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4" >
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

            <div className='flex w-full justify-start gap-2 '>
               <FormButton loading={loading} title={t("button.submit")} id="expense-form" />
            </div>
         </Form>
      </div>
   )
}

export default Expenses; 
