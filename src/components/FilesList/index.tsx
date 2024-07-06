"use client"

import { createUser, updateUser, deleteUser } from '@/services/userApi';
import ManageActions from '@/hooks/ManageActions';
import FormTable from '@/components/Modals/PromptLayout';
import folderForm from '@/components/Forms/folderForm';
import fileForm from '@/components/Forms/fileForm';
import { userConfig } from '@/config/userConfig';
import DataTable from '@/components/DataTable';

import { useTranslations } from '@/hooks/useTranslations';
import { fileColumns } from './Columns';
import CardUser from './Card';
import React from "react";

export default function FilesInFolder({files}) {
   const t = useTranslations();
   
   const mutationConfig = {
      queryKey: 'FilesInFolder',
      apiMethods: {
         delete: deleteUser,
         create: createUser,
         update: updateUser
      }
   };
   
   const columns = fileColumns(t); 

   const forms = [
      { target: 'Folder', component: folderForm },
      { target: 'File', component: fileForm },
  ];
   
   return (
      <>
         <div className='flex flex-col h-full w-full gap-4'>
            <DataTable
               data={files}
               columns={columns}
               filters={userConfig.filters}
               cardComponent={CardUser}
               showHeader={false}
               showPagination={false}
             
            />
         </div>
         
         <FormTable forms={forms} />
      </>
   )
}