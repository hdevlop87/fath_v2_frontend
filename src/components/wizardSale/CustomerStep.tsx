"use client"

import React, { useEffect, useState } from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import customerSetting from '@/settingsJson/customerSetting.json';
import { CustomerSchema, CustomerFormValues } from '@/types/customer.types';

import useStore from '@/store/dataStore';
import useAlertStore from '@/store/alertStore';
import { checkCustomer } from '@/services/customerApi'
import AlertDialog from './AlertDialog'
import { ReloadIcon } from "@radix-ui/react-icons";
import { useTranslations } from 'next-intl';

const Customers = ({ submit, back }) => {
   const t = useTranslations();
   const { fields } = customerSetting;
   const formData = useStore((state) => state.formData.customer);
   const setCustomerData = useStore((state) => state.setCustomerData);
   const { setAlertOpen, setAlertTitle, setAlertDescription } = useAlertStore();
   const [loading, setLoading] = useState(false)

   const form = useForm<CustomerFormValues>({
      resolver: zodResolver(CustomerSchema),
      defaultValues: formData
   });

   async function onSubmit(values: CustomerFormValues) {
      setCustomerData(values);
      setLoading(true)
      let { exists } = await checkCustomer(values);
      exists ? showAlert() : submit()
      setLoading(false)
   }

   const showAlert = () => {
      setAlertTitle("Check Customer");
      setAlertDescription("This Customer already Exist in database");
      setAlertOpen(true);
   };

   const confirmPass = () => {
      setAlertOpen(false);
      setLoading(false)
      submit()
   }

   return (
      <>
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

               <div className='flex w-full justify-end gap-2 mt-12'>
                  <Button onClick={back} variant="outline" >
                     Back
                  </Button>
                  <Button type="submit" variant="outline" className=' gap-1'>
                     {loading ?
                        <> <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Check </> : <> Next </>
                     }
                  </Button>
               </div>
            </form>
         </Form>
         <AlertDialog onConfirm={confirmPass} />
      </>
   )
}

export default Customers;
