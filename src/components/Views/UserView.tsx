'use client';


import React from 'react'
import { usePromptStore } from '@/store/promptStore';
import { userConfig } from '@/config/userConfig';
import FieldRenderer from './FieldRenderer';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import { Label } from '../ui/label';

const UserView = () => {

  const initialValues = usePromptStore.use.initialValues();

  const updatedFields = userConfig.fields
    .filter(field => field.name !== 'password' && field.name !== 'confirmPassword')
    .map(field => {
      if (field.name === 'roleId') {
        return {
          ...field,
          name: 'role',
          label: 'user.roleLabel',
          placeholder: 'user.rolePlaceholder'
        };
      }
      return field;
    });

  return (
    <div className='flex  gap-6 h-full w-[500px]'>
      <div className='flex flex-col w-40 gap-4 h-40'>
        <Label className='text-sm font-medium'>Photo</Label>
        <div className="flex flex-col gap-4 justify-center items-center">

        <Avatar className='w-28 h-28 relative '>
          <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${initialValues.image}`} alt="avatar" />
          <AvatarFallback>
            <Image
              src={"/noavatar.png"}
              alt="no avatar"
              width={112}
              height={112}
              className="z-10"
            />
          </AvatarFallback>
        </Avatar>
        </div>
      </div>

      <Separator orientation="vertical" className='h-92 w-[1.5px]' />
      <div className='flex flex-col flex-1 space-y-6 w-full'>
        {updatedFields.map((fieldData: any) => {
          if (fieldData.name === 'password' || fieldData.name === 'confirmPassword') {
            return null;
          }
          return (
            <FieldRenderer
              key={fieldData.name}
              fieldData={fieldData}
              formData={initialValues}
            />
          )
        })}
      </div>
    </div>
  )
}

export default UserView