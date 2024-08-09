"use client"

import useFetchRoles from '@/hooks/auth/useFetchRoles'
import { roleConfig } from '@/config/roleConfig';
import DataTable from '@/components/DataTable';
import { roleColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';

export default function Roles() {

   const t = useTranslations();
   const columns = roleColumns(t);

   const { data, isLoading } = useFetchRoles();
   if (isLoading) return <>loading...</>;

   return (
      <DataTable
         data={data || []}
         columns={columns}
         filters={roleConfig.filters}
         target="role"
         showMode={false}
      />
   )
}