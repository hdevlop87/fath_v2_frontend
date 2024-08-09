"use client"

import useFetchExpenses from '@/hooks/subdivision/useFetchExpenses'
import { expenseConfig } from '@/config/expenseConfig';
import DataTable from '@/components/DataTable';
import { expenseColumns } from './Columns';
import { useTranslations } from '@/hooks/useTranslations';
import Can from '@/components/Can';

export default function Expenses() {

   const t = useTranslations();
   const columns = expenseColumns(t);

   const { data, isLoading } = useFetchExpenses();
   if (isLoading) return <>loading...</>

   return (
      <Can permission='read_expense'>
         <DataTable
            data={data || []}
            columns={columns}
            filters={expenseConfig.filters}
            target="expense"
            showMode={false}
         />
      </Can>
   )
}