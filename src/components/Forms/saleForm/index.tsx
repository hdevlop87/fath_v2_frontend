import React, { useEffect, useState } from 'react';
import useFetchLots from '@/hooks/subdivision/useFetchLots';
import { saleConfig, SaleType } from '@/config/saleConfig';
import { Form } from "@/components/ui/form";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from '@/components/Forms/FormField';
import { Label } from '@/components/ui/label';
import { usePromptStore } from '@/store/promptStore';
import useFetchCustomers from '@/hooks/subdivision/useFetchCustomers';

const SaleForm = ({ target,handleSubmit }) => {

   const [totalLotPrice, setTotalLotPrice] = useState(0);

   const { availablelotsRef, allLots } = useFetchLots();
   const initialValues = usePromptStore.use.initialValues();
   const { allCustomers } = useFetchCustomers();

   const form = useForm<SaleType>({
      resolver: zodResolver(saleConfig.schema),
      defaultValues: initialValues || saleConfig.defaultValues,
   });

   const customerItems = allCustomers?.map((customer: any) => ({
      label: customer.name,
      value: customer.customerId
   }));

   const onSubmit = (data) => {

      handleSubmit(data);
   };

   const updatedFields = saleConfig.fields
      .map(field => {
         if (field.name === 'lotRef') {
            return {
               ...field,
               items: availablelotsRef,
            };
         }

         else if (field.name === 'customerId') {
            return {
               ...field,
               items: customerItems
            };
         }
         return field;
      });

   const selectedLotRef = useWatch({
      control: form.control,
      name: 'lotRef',
      defaultValue: initialValues.lotRef,
   });

   const priceInputValue = useWatch({
      control: form.control,
      name: 'pricePerM2',
      defaultValue: initialValues.pricePerM2,
   });

   useEffect(() => {

      const selectedLot = allLots?.find((lot) => lot.lotRef == selectedLotRef);
      const totalPrice = selectedLot && priceInputValue ? selectedLot.size * parseFloat(priceInputValue) : 0;
      setTotalLotPrice(totalPrice);

   }, [selectedLotRef, priceInputValue, allLots]);

   return (
      <Form {...form}>
         <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full h-full gap-4" autoComplete="off">
            <div className='flex flex-col w-full gap-6 h-full'>
               {updatedFields.map((fieldData) => (
                  <FormField
                     key={fieldData.name}
                     control={form.control}
                     fieldData={fieldData}
                  />
               ))}
            </div>
            <Label className='mt-4'>{`Total Lot Price = ${totalLotPrice} dh`}</Label>
         </form>
      </Form>
   );
};

export default SaleForm;
