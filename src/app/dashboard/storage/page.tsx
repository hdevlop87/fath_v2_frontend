"use client"

import useFetchFoldersInFolder from '@/hooks/fileManager/useFetchFoldersInFolder';
import useFetchFilesInFolder from '@/hooks/fileManager/useFetchFilesInFolder';
import { useNavigationStore } from '@/store/folderNavigationStore';
import { folderConfig } from '@/config/folderConfig';
import DataTable from '@/components/DataTable';
import { useTranslations } from '@/hooks/useTranslations';
import { fileColumns } from './Columns';
import React from 'react';
import Can from '@/components/Can';


export default function Storage() {

  const t = useTranslations();
  const parentId = useNavigationStore.use.parentId();

  const { data: folders, isLoading: isFoldersLoading } = useFetchFoldersInFolder(parentId);
  const { data: files, isLoading: isFilesLoading } = useFetchFilesInFolder(parentId);

  if (isFilesLoading || isFoldersLoading) return <>loading...</>;
  const items = [...(folders || []), ...(files || [])];
  const columns = fileColumns(t);

  return (
    <Can permission='read_folder'>
      <div className='flex flex-col h-full w-full gap-4'>
        <DataTable
          data={items}
          columns={columns}
          filters={folderConfig.filters}
          mode='card'
          target="folder"
        />
      </div>
    </Can>
  );
}
