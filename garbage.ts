// "use client"

// 
// import { useMutations } from '@/hooks/useMutations';
// import AlertDialog from '@/components/AlertDialog';
// import { useAlertStore } from '@/store/alertStore';
// import useReactTable from './Table/useReactTable';
// import { usePromptStore } from '@/store/promptStore';
// import React, { useState } from "react";
// import Header from './Header';
// import Table from './Table';
// import Cards from "./Cards";

// export default function DataTable({ target, data, columns, filters, mutationConfig, formComponent, cardComponent }) {

//     const { deleteMutation, createMutation, updateMutation } = useMutations(mutationConfig);
//     const setForm = useFormStore.use.setForm();
//     const setAlert = useAlertStore.use.setAlert();
//     const [renderMode, setRenderMode] = useState('table');

//     const onUpload = () => {
//         // TODO: call upload dialog get file
//     }

//     const onRead = (data) => {
//         // TODO: call api get item && open new page with new incoming data
//     }

//     const onCreate = () => {
//         setForm({
//             isOpen: true,
//             title: 'New '+target,
//             isEditing: false,
//             onSubmit: (data) => {
//                 createMutation.mutate(data);
//             }
//         });
//     }

//     const onUpdate = (item) => {
//         setForm({
//             isOpen: true,
//             title: 'Edit '+target, 
//             isEditing: false,
//             initialValues:item,
//             onSubmit: (newItem) => {
//                 updateMutation.mutate(newItem);
//             }
//         });
//     }

//     const onDelete = (item) => {
//         setAlert({
//             isOpen: true,
//             title: 'Are you absolutely sure?',
//             onConfirm: () => {
//                 deleteMutation.mutate(item.id);
//             }
//         })
//     }

//     const table = useReactTable({ data, columns, onRead, onUpdate, onDelete });

//     return (

//         <div className="w-full">
//             <Header table={table} filters={filters} onDownload={onUpload} onCreate={onCreate} setRenderMode={setRenderMode} />
//             {
//                 renderMode === 'table' ?
//                     <Table table={table} columns={columns} /> :
//                     <Cards table={table} Card={cardComponent} />
//             }
//             <FormTable Form={formComponent} target={target}/>
//             <AlertDialog />
//         </div>

//     )
// }
