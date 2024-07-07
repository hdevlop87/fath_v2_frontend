import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Label } from '@/components/ui/label';
import { useTranslations } from '@/hooks/useTranslations';
import SaleStep from './SaleStep';
import CustomerStep from './CustomerStep';
import PaymentStep from './PaymentStep';
import { Button } from "@/components/ui/button";
import SubmitButton from '@/components/loadingButton';
import { useLoaderStore } from '@/store/loaderStore';
import useFormStore from './formStore';

export default function WizardSale({ handleSubmit }) {

   const t = useTranslations();
   const [currentStep, setCurrentStep] = useState(0);
   const queryLoading = useLoaderStore.use.queryLoading();
   const { setFormData, formData, resetFormData } = useFormStore();

   useEffect(() => {
      resetFormData();
   }, []);
   
   const handleNext = (data) => {
      saveStepData(data);
      setCurrentStep(prevStep => prevStep + 1);
   };

   const handlePrev = () => {
      if (currentStep > 0) {
         setCurrentStep(prevStep => prevStep - 1);
      }
   };

   const onSubmit = (payment) => {
      saveStepData(payment);
      handleSubmit({ ...formData, payment })
   };


   const saveStepData = (data) => {
      const stepKey: any = steps[currentStep].id;
      setFormData(stepKey, data);
   };

   const steps = [
      {
         id: "sale",
         label: t("wizard.sale"),
         icon: "mdi:point-of-sale",
         component: <SaleStep id="sale" onSubmit={handleNext} />
      },
      {
         id: "customer",
         label: t("wizard.account"),
         icon: "mdi:badge-account",
         component: <CustomerStep id="customer" onSubmit={handleNext} />
      },
      {
         id: "payment",
         label: t("wizard.payment"),
         icon: "majesticons:money-hand",
         component: <PaymentStep id="payment" onSubmit={onSubmit} />
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
                     <Label className={`${currentStep >= index ? 'text-primary' : 'text-gray-300'}`}>{step.label}</Label>
                  </div>
                  {index !== steps.length - 1 && <Separator orientation="horizontal" className='w-[100px] h-[2px] mb-6' />}
               </React.Fragment>
            ))}
         </div>

         {steps[currentStep].component}

         <div className="flex justify-end gap-4 mt-4">
            <Button onClick={handlePrev} disabled={currentStep === 0} variant='outline'>
               Back
            </Button>
            {currentStep < steps.length - 1 ? (
               <Button form={steps[currentStep].id} type="submit" variant='outline'>
                  Next
               </Button>
            ) : (
               <SubmitButton
                  submitText={t('button.submit')}
                  loadingText={t('button.pleaseWait')}
                  className={`gap-1 hover:bg-primary-hover`}
                  loading={queryLoading}
                  form={steps[currentStep].id}
               />
            )}
         </div>
      </div>
   );
}
