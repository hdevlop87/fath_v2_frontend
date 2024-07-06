'use client'

import React from 'react';

import AutoInput from '@/components/AutoInput';
import { useTranslations } from '@/hooks/useTranslations';
import { FormItem,FormField, FormMessage } from "@/components/ui/form";

const FormFieldRender = ({ control, fieldData }:any) => {

   const t = useTranslations();
   
   const translateItems = (items) => {
      return items.map(item => {
         if (typeof item === 'string') {
            return t(item);
         }
         else if (item && typeof item === 'object' && item.label) {
            return { ...item, label: t(item.label) };
         }
         return item;
      });
   };

   return (
      <FormField  
         control={control}
         name={fieldData.name}
         render={({ field }) => (
            <FormItem>
               <AutoInput
                  type={fieldData.type}
                  placeholder={t(fieldData.placeholder)}
                  field={field}
                  label={t(fieldData.label)}
                  items={fieldData.items ? translateItems(fieldData.items) : []}
                  note={fieldData.note}
               />
               <FormMessage />
            </FormItem>
         )}
      />
   );
};

export default FormFieldRender;
