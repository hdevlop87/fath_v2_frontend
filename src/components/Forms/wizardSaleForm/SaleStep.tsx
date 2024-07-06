import React, { useEffect } from 'react';
import useFetchLots from '@/hooks/subdivision/useFetchLots';
import { saleConfig, SaleType } from '@/config/saleConfig';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from '@/components/Forms/FormField';
import { Label } from '@/components/ui/label';
import useFormStore from './formStore';

const SaleStep = ({ id, onSubmit }) => {
  const { availableLots, availablelotsRef } = useFetchLots();
  const { getFormData } = useFormStore();
  const formData = getFormData('sale');

  const form = useForm<SaleType>({
    resolver: zodResolver(saleConfig.schema),
    defaultValues: { ...saleConfig.defaultValues, ...formData },
  });

  const updatedFields = saleConfig.fields
    .filter(field => field.name !== 'customerId' && field.name !== 'isActif')
    .map(field => {
      if (field.name === 'lotRef') {
        return {
          ...field,
          items: availablelotsRef,
        };
      }
      return field;
    });


  const selectedLotRef = form.watch('lotRef');
  const priceInputValue: any = form.watch('pricePerM2');
  const selectedLot = availableLots.find((lot: any) => lot.lotRef === selectedLotRef);
  const totalLotPrice = selectedLot && priceInputValue ? selectedLot.size * parseFloat(priceInputValue) : 0;

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col w-full h-full gap-4" autoComplete="off">
        <div className='flex flex-col w-full gap-6 h-full'>
          {updatedFields.map((fieldData: any) => (
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

export default SaleStep;
