"use client"

import useFetchPermissions from '@/hooks/auth/useFetchPermissions'
import { permissionConfig } from '@/config/permissionConfig';
import DataTable from '@/components/DataTable';
import { permissionColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';

export default function Permissions() {

   const t = useTranslations();
   const columns = permissionColumns(t);

   const { data, isLoading } = useFetchPermissions();
   if (isLoading) return <>loading...</>;

   return (
      <DataTable
         data={data || []}
         columns={columns}
         filters={permissionConfig.filters}
         target="permission"
         showMode={false}
      />
   )
}