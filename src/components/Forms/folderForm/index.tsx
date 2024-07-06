'use client'

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { folderConfig, FolderType } from '@/config/folderConfig';
import { useTranslations } from '@/hooks/useTranslations';
import { usePromptStore } from '@/store/promptStore';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import folders from '@/assets/folders.png'
import {useNavigationStore} from '@/store/folderNavigationStore'; 

const folderForm = ({ target, handleSubmit }) => {

   const t = useTranslations();
   const initialValues = usePromptStore.use.initialValues();
   const parentId = useNavigationStore((state:any) => state.parentId);

   const form = useForm<FolderType>({
      resolver: zodResolver(folderConfig.schema),
      defaultValues: initialValues || folderConfig.defaultValues
   });
 
   const onSubmit = (data) => {
      data.parentId = parentId;
      handleSubmit(data); 
   };

   return (
      <div className='flex flex-col gap-4 w-[500px] '>

         <Form {...form}>
            <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               <div className='flex w-full gap-6 h-full'>
                  <div className='flex w-44 items-center justify-center h-92'>
                     <Image src={folders} width={150} alt="Picture of the author"></Image>
                  </div>

                  <Separator orientation="vertical" className='h-92 w-[1.5px]' />

                  <div className='flex flex-col flex-1 space-y-6'>
                     {folderConfig.fields.map((fieldData: any) => (
                        <FormField
                           key={fieldData.name}
                           control={form.control}
                           name={fieldData.name}
                           render={({ field }) => (
                              <FormItem>
                                 <AutoInput
                                    type={fieldData.type}
                                    placeholder={fieldData.placeholder && t(fieldData.placeholder)}
                                    field={field}
                                    label={t(fieldData.label)}
                                    items={fieldData.items}
                                    note={fieldData.note}
                                 />
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     ))}
                  </div>
               </div>
            </form>
         </Form>
      </div>
   )
}

export default folderForm;