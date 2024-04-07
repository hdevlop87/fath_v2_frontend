import React, { useState } from 'react';
import CustomerStep from './CustomerStep'
import SaleStep from './SaleStep'
import PaymentStep from './paymentStep'
import useStore from '@/store/dataStore';
import { Icon } from '@iconify/react';
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { Label } from '@/components/ui/label';
import { useTranslations } from 'next-intl';
import { resizeImage } from '@/lib/utils';
import { sendFile } from '@/lib/utils';

export default function WizardSale({ submit, loading }) {

   const t = useTranslations();

   const [currentStep, setCurrentStep] = useState(0);

   const handleNext = () => {
      if (currentStep < steps.length - 1) {
         setCurrentStep(prevStep => prevStep + 1);
      }
   };

   const handlePrev = () => {
      if (currentStep > 0) {
         setCurrentStep(prevStep => prevStep - 1);
      }
   };

   const handleSubmit = async () => {
      const allFormData = useStore.getState().formData;
      if (allFormData.payment.receipt && allFormData.payment.receipt.name) {

         const customerCIN = allFormData.customer.CIN;
         const fileName = customerCIN + '_' +allFormData.payment.receipt.name;
         const resizedFile: any = await resizeImage(allFormData.payment.receipt, 800, 800);
         await sendFile(resizedFile, fileName);
         allFormData.payment.receipt = `/api/fileUpload/${fileName}`
      }

      delete allFormData.lot
      submit(allFormData)
   };


   const steps = [
      {
         label: t("wizard.sale"),
         icon: "mdi:point-of-sale",
         component: <SaleStep submit={handleNext} />
      },
      {
         label: t("wizard.account"),
         icon: "mdi:badge-account",
         component: <CustomerStep submit={handleNext} back={handlePrev} />
      },
      {
         label: t("wizard.payment"),
         icon: "majesticons:money-hand",
         component: <PaymentStep submit={handleSubmit} back={handlePrev} loading={loading} />
      },
   ];

   return (
      <div className="flex flex-col w-[400px] h-auto gap-10">
         <div className={cn('flex items-center gap-2 justify-center')}>
            {steps.map((step, index) => (
               <React.Fragment key={index}>
                  <div className='flex flex-col items-center justify-center gap-2'>
                     <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= index ? 'bg-primary' : 'bg-gray-300'}`}>
                        {
                           currentStep > index ?
                              <Icon icon="iconamoon:check-bold" width={22} color='white' /> :
                              <Icon icon={step.icon} width={22} color='white' />
                        }
                     </div>
                     <Label className={`${currentStep >= index ? 'te xt-primary' : 'text-gray-300'}`}>{step.label}</Label>
                  </div>
                  {index !== steps.length - 1 && <Separator orientation="horizontal" className='w-[100px] h-[2px] mb-6' />}
               </React.Fragment>
            ))}
         </div>

         {steps[currentStep].component}
      </div>
   );
}
