'use client';

import React from 'react';
import { usePromptStore } from '@/store/promptStore';
import FieldRenderer from './FieldRenderer';
import { Label } from '../ui/label';

const PaymentView = () => {
  const initialValues = usePromptStore.use.initialValues();
  const receiptImage = initialValues.receipt ? `${process.env.NEXT_PUBLIC_API_URL}/${initialValues.receipt}` : "/noreceipt.png";
  const isReceiptAvailable = Boolean(initialValues.receipt);

  return (
    <div className='flex flex-col gap-6 h-[520px] w-[300px]'>

      <FieldRenderer
        key="amount"
        fieldData={{
          type: "text",
          name: "amount",
          placeholder: "payment.amountPlaceholder",
          label: "payment.amountLabel"
        }}
        formData={initialValues}
      />

      <FieldRenderer
        key="paymentReference"
        fieldData={{
          type: "text",
          name: "paymentReference",
          placeholder: "payment.referencePlaceholder",
          label: "payment.referenceLabel"
        }}
        formData={initialValues}
      />

      <Label className='text-sm font-medium'>Photo</Label>
      <div className="flex flex-col gap-4 items-center justify-center">
        <img 
          src={receiptImage} 
          alt="receipt" 
          className={isReceiptAvailable ? 'w-[300px] h-[300px]' : 'w-[150px] h-[150px]'} 
        />
      </div>
    </div>
  );
};

export default PaymentView;
