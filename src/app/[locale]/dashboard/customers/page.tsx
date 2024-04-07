"use client"

import DataTable from '@/components/DataTable';
import { customerColumns } from './Columns';
import CustomerFrom from '@/components/Forms/CustomerForm'
import { createCustomer, updateCustomer, deleteCustomer, uploadFileCustomer } from '@/services/customerApi'
import CustomerSetting from '@/settingsJson/customerSetting.json';
import { Card } from '@/components/ui/card';
import { useTranslations } from 'next-intl';
import useFetchCustomers from '@/hooks/useFetchCustomers'

const { toastMessages, queryKey } = CustomerSetting;

export default function Customers() {

   const t = useTranslations();
   const columns = customerColumns(t);

   const { data } = useFetchCustomers();

   const filters = [
      {
         name: "lastName",
         type: "text",
         placeHolder:'Filtrer par Client.....'
      }
   ]

   return (
      <Card className='p-4 h-full w-full'>
         <DataTable
            data={data}
            dataType='customer'
            columns={columns}
            formComponent={CustomerFrom}
            apiMethods={{ create: createCustomer, update: updateCustomer, delete: deleteCustomer, uploadFile: uploadFileCustomer }}
            toastMessages={toastMessages}
            queryKey={queryKey}
            filters={filters}
         />
      </Card>
   )
}