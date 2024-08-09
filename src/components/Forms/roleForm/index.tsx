'use client'

import React, { useState } from 'react';
import { roleConfig, RoleType } from '@/config/roleConfig';
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from '@/components/Forms/FormField'
import { usePromptStore } from '@/store/promptStore';
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { groupedPermissions } from './permissions';
import { Label } from '@/components/ui/label';
import PermissionSwitch from './PermissionSwitch'



const PermissionGroup = ({ group, togglePermission, selectedPermissions }) => {
   return (
      <div className='flex flex-col border-2 p-3 gap-2 rounded-lg'>
         <Label>{group.title}</Label>
         <div className='flex items-center gap-4'>
            {group.permissions.map((permission) => (
               <PermissionSwitch 
                  key={permission.name} 
                  permission={permission} 
                  togglePermission={togglePermission} 
                  isChecked={selectedPermissions.has(permission.name)} 
               />
            ))}
         </div>
      </div>
   );
};

const RoleForm = ({ target, handleSubmit }) => {

   const initialValues = usePromptStore.use.initialValues();
   const isCreate = !initialValues || !initialValues.roleId;
   const initialPermissions = new Set(initialValues?.permissions || []);

   const [selectedPermissions, setSelectedPermissions] = useState(initialPermissions);

   const form = useForm<RoleType>({
      resolver: zodResolver(roleConfig.schema),
      defaultValues: isCreate ? roleConfig.defaultValues : initialValues
   });

   const togglePermission = (permissionName) => {
      setSelectedPermissions(prev => {
         const updated = new Set(prev);
         if (updated.has(permissionName)) {
            updated.delete(permissionName);
         } else {
            updated.add(permissionName);
         }
         return updated;
      });
   };

   const onSubmit = (data) => {
      handleSubmit({ ...data, permissions: Array.from(selectedPermissions) });
   };

   return (
      <div className='flex flex-col gap-4 w-[800px] h-[500px] overflow-scroll p-2'>
         <Form {...form}>
            <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full" autoComplete="off">
               <div className='flex flex-col w-full gap-6 h-full'>
                  {roleConfig.fields.map((fieldData: any) => (
                     <FormField
                        key={fieldData.name}
                        control={form.control}
                        fieldData={fieldData}
                     />
                  ))}
               </div>
            </form>
         </Form>
         <Label className="text-primary">Permissions</Label>
         {groupedPermissions.map((group) => (
            <PermissionGroup 
               key={group.title} 
               group={group} 
               togglePermission={togglePermission} 
               selectedPermissions={selectedPermissions} 
            />
         ))}
      </div>
   );
}

export default RoleForm;
