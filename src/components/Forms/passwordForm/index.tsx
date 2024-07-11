'use client';

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useTranslations } from '@/hooks/useTranslations';
import { usePromptStore } from '@/store/promptStore';


const passwordSchema = z.object({
   id: z.string().optional(),
   password: z.string({ required_error: "Le mot de passe est requis" }),
   confirmPassword: z.string({ required_error: "La confirmation du mot de passe est requise" }),
}).refine((data) => {
   if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
      return false;
   }
   return true;
}, {
   message: "Les mots de passe doivent correspondre",
   path: ["confirmPassword"]
})

export type PasswordType = z.infer<typeof passwordSchema>;

const PasswordForm = ({ target, handleSubmit }) => {

   const t = useTranslations();
   const initialValues = usePromptStore.use.initialValues();

   const form = useForm<PasswordType>({
      resolver: zodResolver(passwordSchema),
      defaultValues: initialValues || { password: '' }
   });

   const onSubmit = (data) => {
      const { confirmPassword, ...filteredData } = data;
      handleSubmit(filteredData);
   };

   return (
      <div className='flex flex-col gap-4 w-[400px] '>
         <Form {...form}>
            <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               <div className='flex w-full gap-6 h-full'>
                  <div className='flex flex-col flex-1 space-y-6'>
                     <FormField
                        name="password"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem>
                              <AutoInput
                                 type="text"
                                 placeholder={t('user.passwordPlaceholder')}
                                 field={field}
                                 label={t('user.passwordLabel')}
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        name="confirmPassword"
                        control={form.control}
                        render={({ field }) => (
                           <FormItem>
                              <AutoInput
                                 type="text"
                                 placeholder={t('user.confirmPasswordPlaceholder')}
                                 field={field}
                                 label={t('user.confirmPasswordLabel')}
                              />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>
               </div>
            </form>
         </Form>
      </div>
   );
}

export default PasswordForm;
