"use client"
import React, { useState } from 'react';
import useFetchParsedPath from '@/hooks/fileManager/useFetchParsedPath';
import useFetchFoldersInFolder from '@/hooks/fileManager/useFetchFoldersInFolder';
import Breadcrumbs from '@/components/Breadcrumbs';
import { usePromptStore } from '@/store/promptStore';
import { Label } from '@/components/ui/label';
import Image from "next/image";
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/utils';
import { useForm } from "react-hook-form";

const MoveForm = ({target, handleSubmit}) => {
  const initialValues = usePromptStore.use.initialValues();
  const initialParentId = initialValues.parentId || 'root';
  const [currentParentId, setCurrentParentId] = useState(initialParentId);

  const { data: breadcrumbsData, isLoading: isBreadcrumbsLoading } = useFetchParsedPath(currentParentId);
  const { data: folders, isLoading: isFoldersLoading } = useFetchFoldersInFolder(currentParentId);

  const form = useForm({
    defaultValues: initialValues
 });

  const onSubmit = async () => {
    const fileId = initialValues.id;
    const folderId = currentParentId;
    handleSubmit({fileId,folderId});
  };

  if (isBreadcrumbsLoading || isFoldersLoading) return <>loading...</>;

  const onFolderClick = (folder) => {
    setCurrentParentId(folder.id);
  };

  return (
    <div className="flex w-[400px] flex-col gap-4 items-start justify-start">
      <Breadcrumbs breadcrumbsData={breadcrumbsData || []} onBreadcrumbClick={setCurrentParentId} />
      <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
          <div className='border rounded-xl h-[300px] w-full overflow-y-scroll pb-6'>
            {folders.map((folder) => (
              <div
                key={folder.name}
                className='flex flex-col w-full justify-start cursor-pointer'
                onClick={() => onFolderClick(folder)}
              >
                <div className='gap-2 flex items-center p-3'>
                  <Image src={"/filesIcon/folder.png"} width={48} height={48} alt="icon" />
                  <div className='flex w-full justify-between items-center'>
                    <Label className="text-md cursor-pointer">{folder.name}</Label>
                    <Label className="text-xs text-stone-500 ">{formatDate(folder.updatedAt)}</Label>
                  </div>
                </div>
                <Separator className='h-[1px] ' />
              </div>
            ))}
          </div>
    
      </form>
    </div>
  );
};

export default MoveForm;
