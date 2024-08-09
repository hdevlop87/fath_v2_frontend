'use client';

import React, { useState } from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { userConfig, UserType } from '@/config/userConfig';
import { useTranslations } from '@/hooks/useTranslations';
import { usePromptStore } from '@/store/promptStore';
import UserAvatar from './userAvatar';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';

const UserForm = ({ target, handleSubmit }) => {

   const t = useTranslations();
   const initialValues = usePromptStore.use.initialValues();
   const isCreate = !initialValues || !initialValues.id;
   const [avatarImage, setAvatarImage] = useState(null);

   const form = useForm<UserType>({
      resolver: zodResolver(userConfig.schema),
      defaultValues: isCreate ? userConfig.defaultValues : initialValues
   });

   const onSubmit = async (data) => {
      const userData = {
         ...data,
         avatarImage,
      };
      handleSubmit(userData);
   };

   return (
      <div className='flex flex-col gap-4 w-[500px] '>
         <Form {...form}>
            <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               
               <div className='flex w-full gap-6 h-full'>
                  <div className='flex w-44 justify-center  h-52'>
                     <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                           <FormItem className='w-full'>
                              <Label className='text-sm font-medium'>Photo</Label>
                              <UserAvatar field={field} onImageChange={(avatarImage) => setAvatarImage(avatarImage)} />
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <Separator orientation="vertical" className='h-92 w-[1.5px]' />

                  <div className='flex flex-col flex-1 space-y-6'>
                     {userConfig.fields.map((fieldData: any) => {
                        if (!isCreate && (fieldData.name === 'password' || fieldData.name === 'confirmPassword')) {
                           return null;
                        }
                        return (
                           <FormField
                              key={fieldData.name}
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
                                       note={fieldData.note}
                                    />
                                    <FormMessage />
                                 </FormItem>
                              )}
                           />
                        )
                     })}
                  </div>
               </div>
            </form>
         </Form>
      </div>
   )
}

export default UserForm;
