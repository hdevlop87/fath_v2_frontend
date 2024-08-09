'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox";

const PermissionSwitch = ({ permission, togglePermission, isChecked }) => {
    
   const handleToggle = () => {
      togglePermission(permission.name);
   };

   return (
      <div className='flex gap-2 items-center justify-center'>
         <Checkbox checked={isChecked} onCheckedChange={handleToggle} className='mt-[1px]'/>
         <Label className='text-sm font-normal'>{permission.name.replace(/_/g, ' ')}</Label> 
      </div>
   );
};

export default PermissionSwitch