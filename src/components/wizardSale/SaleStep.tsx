"use client"

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import saleSetting from '@/settingsJson/saleSetting.json';
import { SaleSchema, SaleFormValues } from '@/types/sale.types';
import useStore from '@/store/dataStore';
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import useFetchLots from '@/hooks/useFetchLots'; 


const Sales = ({ submit }) => {
   const t = useTranslations();
   useFetchLots();
   const { fields } = saleSetting;
   const formData = useStore((state) => state.formData.sale);
   const setSaleData = useStore((state) => state.setSaleData);

   const availableLots = useStore((state) => state.availableLots);

   const lotRefItems = availableLots.map((lot: any) => lot.lotRef);

   const form = useForm<SaleFormValues>({
      resolver: zodResolver(SaleSchema),
      defaultValues: formData
   });

   const selectedLotRef = form.watch('lotRef');
   const priceInputValue:any = form.watch('pricePerM2');

   const selectedLot = availableLots.find((lot: any) => lot.lotRef === selectedLotRef);
   const totalLotPrice = selectedLot && priceInputValue ? selectedLot.size * parseFloat(priceInputValue) : 0;

   function onSubmit(values: SaleFormValues) {
      const finalValues:any = {
         ...values,
         status: values.isActif ? 'Ongoing' : 'Canceled',
      };
      delete finalValues.isActif
      setSaleData(finalValues);
      submit();
   }

   const updatedFields = fields
      .filter(field => field.name !== 'customerID' && field.name !== 'isActif')
      .map(field => {
         if (field.name === 'lotRef') {
            return {
               ...field,
               items: lotRefItems
            };
         }
         return field;
      })

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-wrap gap-4 justify-between" >
            {updatedFields.map((fieldData: any) => (
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
                              label={fieldData.label ? t(fieldData.label) : ''}
                              items={fieldData.items}
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
            ))}

            <Label className='mt-4'>{`Total Lot Price = ${totalLotPrice} dh`}</Label>

            <div className='flex w-full justify-end gap-2 mt-22'>

               {/* <Button onClick={back} variant="outline" className='mt-2 gap-1'>
                  Back
               </Button> */}
               <Button type="submit" variant="outline" className='mt-2 gap-1 '>
                  Next
               </Button>
            </div>

         </form>
      </Form>
   )
}

export default Sales;


