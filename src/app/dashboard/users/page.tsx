"use client"


import useFetchUsers from '@/hooks/auth/useFetchUsers'
import { userConfig } from '@/config/userConfig';
import DataTable from '@/components/DataTable';
import { useTranslations } from '@/hooks/useTranslations';
import { userColumns } from './Columns';
import React from "react";
import Can from '@/components/Can';

export default function Users() {

   const t = useTranslations();
   const { data, isLoading } = useFetchUsers();
   if (isLoading) return <>loading...</>

   const columns = userColumns(t);

   return (
      <Can permission='read_user'>
         <DataTable
            data={data || []}
            columns={columns}
            filters={userConfig.filters}
            target="user"
            mode = 'cards'
         />
      </Can>
   )
}