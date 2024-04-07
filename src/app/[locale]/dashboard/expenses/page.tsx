"use client"

import DataTable from '@/components/DataTable';
import { expenseColumns } from './Columns';
import ExpenseFrom from '@/components/Forms/expenseForm'
import { createExpense, updateExpense, deleteExpense, uploadFileExpense } from '@/services/expenseApi'
import ExpenseSetting from '@/settingsJson/expenseSetting.json';
import { Card } from '@/components/ui/card';
import useFetchExpenses from '@/hooks/useFetchExpenses'
import { useTranslations } from 'next-intl';
import DialogShowImage from '@/components/DialogShowImage';
const { toastMessages, queryKey } = ExpenseSetting;

export default function Expenses() {
   const t = useTranslations();
   const { data } = useFetchExpenses();
   const columns = expenseColumns(t);

   const statusesFilter = [
      {
         value: "Permits_and_Authorizations",
         label: t("expense.type.Permits_and_Authorizations"),
      },
      {
         value: "Development_Work",
         label: t("expense.type.Development_Work"),
      },
      {
         value: "Marketing_and_Advertising",
         label: t("expense.type.Marketing_and_Advertising"),
      },
      {
         value: "Property_Taxes_and_Duties",
         label: t("expense.type.Property_Taxes_and_Duties"),
      },
      {
         value: "Labor",
         label: t("expense.type.Labor"),
      },
      {
         value: "Miscellaneous",
         label: t("expense.type.Miscellaneous"),
      },
   ]

   const filters = [
      {
         name: "beneficiary",
         type: "text",
         placeHolder:'Filtrer par Bénéficiaire.....'
      },
      {
         name: "type",
         type: "select",
         items:statusesFilter,
         placeHolder:'Type de dépense'
      }
   ]


   return (
      <Card className='p-4 h-full w-full'>
         <DataTable
            data={data}
            columns={columns}
            dataType='expense'
            formComponent={ExpenseFrom}
            apiMethods={{ create: createExpense, update: updateExpense, delete: deleteExpense, uploadFile: uploadFileExpense }}
            toastMessages={toastMessages}
            queryKey={queryKey}
            filters={filters}
         />
         <DialogShowImage />
      </Card>
   )
}