"use client"
import React, { useState } from "react";
import { useReactTable } from "@tanstack/react-table"
import { getCoreRowModel, getFacetedRowModel, getFacetedUniqueValues, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, ColumnFiltersState, SortingState } from "@tanstack/react-table"
import useDialogStore from '@/store/dialogStore';
import FilterBy from './FilterBy'
import PaginationControls from './PaginationControls'
import Table from './Table'
import ControlButtons from './ControlButtons'
import DialogForm from '../ui/DialogForm'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';
import AlertDialog from './AlertDialog'
import DialogUpload from './DialogUpload'
import FileReaderUplaod from './fileReaderUplaod'
import useStore from '@/store/dataStore';
import { useTranslations } from 'next-intl';

export default function DataTable({ data = [],
   dataType = '',
   columns,
   formComponent: FormComponent,
   editFormComponent: EditFormComponent,
   apiMethods,
   toastMessages,
   queryKey,
   filters
}: { filters:any,apiMethods: any, formComponent: any, columns: any, data: [], dataType: string, editFormComponent?: any, toastMessages: any, queryKey: any }) {

   const t = useTranslations();
   const [isEditing, setIsEditing] = useState(false);
   const [loading, setLoading] = useState(false);
   const queryClient = useQueryClient();

   const { setFormOpen, setAlertOpen, setUploadOpen } = useDialogStore();
   const resetAll = useStore(state => state.resetAllFormData);
   const resetFormData = useStore(state => state.resetFormData);
   const formData = useStore(state => state.formData[dataType]);

   const setData = useStore(state => {

      switch (dataType) {
         case 'customer':
            return state.setCustomerData;
         case 'sale':
            return state.setSaleData;
         case 'lot':
            return state.setLotData;
         case 'payment':
            return state.setPaymentData;
         case 'expense':
            return state.setExpenseData;
         default:
            return null;
      }
   });

   const [sorting, setSorting] = React.useState<SortingState>([])
   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
   const [columnVisibility, setColumnVisibility] = useState({});
   const [rowSelection, setRowSelection] = useState({});

   const handleDelete = (record: any) => {
      setData(record);
      setAlertOpen(true);
   }

   const handleEdit = (record: any) => {
      setIsEditing(true);
      setData(record);
      setFormOpen(true);
   }

   const table = useReactTable({
      data,
      columns,

      state: {
         sorting,
         columnVisibility,
         rowSelection,
         columnFilters,
      },
      enableRowSelection: true,
      onRowSelectionChange: setRowSelection,
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      onColumnVisibilityChange: setColumnVisibility,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),

      meta: {
         handleDelete: handleDelete,
         handleEdit: handleEdit
      }

   })

   const addItems = () => {
      setIsEditing(false);

      if (dataType !== 'payment') {
         resetAll();
      } else {
         resetFormData('payment')
      }
      setFormOpen(true)
   }

   const downloadCSV = () => {
      setUploadOpen(true)
   }
   //============================== Mustations Query ===============================//

   const createMutation = useMutation(apiMethods.create, {
      onMutate: () => {
         setLoading(true);
      },
      onSuccess: () => {
         setLoading(false);
         setFormOpen(false);
         toast.success(t(toastMessages.createSuccess));
         queryClient.invalidateQueries(queryKey);
      },
      onError: (error: any) => {
         setLoading(false);
         toast.error(t(error.response.data.message));
      },
   });

   const editMutation = useMutation(apiMethods.update, {
      onMutate: () => {
         setLoading(true);
      },
      onSuccess: () => {
         setLoading(false);
         setFormOpen(false)
         toast.success(t(toastMessages.updateSuccess));
         queryClient.invalidateQueries(queryKey);
         setData(null);
      },
      onError: (error: any) => {
         setLoading(false);
         toast.error(t(error.response.data.message));
      },
   });

   const deleteMutation = useMutation(apiMethods.delete, {
      onSuccess: () => {
         toast.success(t(toastMessages.deleteSuccess));
         queryClient.invalidateQueries(queryKey);
      },
      onError: (error: any) => {
         toast.error(t(error.response.data.message));
      },
   });

   const uploadFileMutation = useMutation(apiMethods.uploadFile, {
      onMutate: () => {
         setLoading(true);
      },
      onSuccess: () => {
         setLoading(false);
         setData(null);
         toast.success(t(toastMessages.uploadSuccess));
         queryClient.invalidateQueries(queryKey); // if needed
      },
      onError: (error: any) => {
         setLoading(false);
         toast.error(error.response?.data?.message || t(toastMessages.uploadError));
      },
   });

   //===============================================================================//

   const handleSubmit = (record: any) => {
      if (isEditing) {
         editMutation.mutate(record);
      } else {
         createMutation.mutate(record);
      }
   };

   const confirmDelete = () => {
      deleteMutation.mutate(formData);
      setAlertOpen(false);
      setData(null);
   }

   const handleUploadFile = (parsedData: any) => {
      uploadFileMutation.mutate(parsedData);
      setUploadOpen(null);
   }

   //===============================================================================//

   const getFormComponent = () => {
      if (isEditing && EditFormComponent) {
         return <EditFormComponent loading={loading} submit={handleSubmit} />;
      }
      return <FormComponent loading={loading} submit={handleSubmit} />;
   };

   return (
      <div className="w-full">

         <div className="flex justify-between items-center mb-4">
            <FilterBy table={table} filters={filters}/>
            <ControlButtons table={table} onDownloadClick={downloadCSV} onAddItemClick={addItems} />
         </div>

         <Table table={table} columns={columns} />

         <PaginationControls table={table} />

         <DialogForm>
            {getFormComponent()}
         </DialogForm>

         <DialogUpload >
            <FileReaderUplaod onFileParsed={handleUploadFile} />
         </DialogUpload>

         <AlertDialog onConfirm={confirmDelete} />

      </div>
   )
}
