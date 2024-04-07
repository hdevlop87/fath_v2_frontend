"use client"

import React, { useMemo } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import paymentSetting from '@/settingsJson/paymentSetting.json';
import { PaymentSchema, PaymentFormValues } from '@/types/payment.types';
import useStore from '@/store/dataStore';
import FormButton from './FormButton';
import FieldRenderer from './FieldRenderer';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { resizeImage } from '@/lib/utils';
import { sendFile } from '@/lib/utils';

const Payments = ({ submit, loading }) => {
  const t = useTranslations();
  const { fields } = paymentSetting;
  const searchParams = useSearchParams();
  const saleID = searchParams.get('saleID');
  const payment = useStore((state) => state.formData.payment);
  const customer = useStore((state) => state.formData.customer);

  const [currentFileName, setCurrentFileName] = React.useState(null);

  const updatedData = useMemo(() => ({
    ...payment,
    date: payment?.date ? new Date(payment.date) : null,
  }), [payment]);


  React.useEffect(() => {
    if (payment && payment.receipt) {
      setCurrentFileName(payment.receipt.name);
    }
  }, [payment]);


  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: updatedData
  });

  async function onSubmit(values: PaymentFormValues) {
    const finalValues = {
      ...values,
      ...(payment?.paymentID ? { paymentID: payment.paymentID } : {}),
      ...{ saleID: saleID }
    };

    if (values.receipt && values.receipt.name !== currentFileName) {
      const fileName = customer.CIN + '_payment_' + values.receipt.name;
      const resizedFile: any = await resizeImage(values.receipt, 800, 800);
      await sendFile(resizedFile, fileName);
      finalValues.receipt = `/api/fileUpload/${fileName}`
    } else {
      finalValues.receipt = currentFileName;
    }

    submit(finalValues);
  }

  return (
    <div className='flex flex-col gap-4 w-[350px] justify-between '>
      <Form {...form}>
        <h3 className="font-semibold ">{payment === null ? t("payment.createNewPayment") : t("payment.editPayment")}</h3>
        <form id="payment-form" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-wrap gap-4" >
          {fields.map((fieldData) => (
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
          <FormButton loading={loading} title={t("button.submit")} id="payment-form" />
        </div>
      </Form>
    </div>
  )
}

export default Payments; 
