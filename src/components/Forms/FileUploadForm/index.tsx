"use client"

import FileUpload from '@/components/FileDropArea'
import React, { useState, useEffect } from 'react';
import FileItem from './FileItem';
import { uploadFile } from '@/services/fileApi';
import { queryClient } from '@/providers/QueryClientProvider';
import {useNavigationStore} from '@/store/folderNavigationStore';

const FileUploadShow = ({ onFileUploadComplete }) => {

   const [files, setFiles] = useState([]);
   const [uploadProgress, setUploadProgress] = useState({});
   const [containerHeight, setContainerHeight] = useState('auto'); 
   const parentId = useNavigationStore.use.parentId();

   useEffect(() => {
      const fileItemHeight = 100;
      const newHeight = files.length * fileItemHeight;
      setContainerHeight(`${Math.min(newHeight, 500)}px`);
   }, [files]);

   const handleFilesAdded = (newFiles) => {
      setFiles([...files, ...Array.from(newFiles)]);
      Array.from(newFiles).forEach((file:any) => {
         setUploadProgress(prevProgress => ({ ...prevProgress, [file.name]: 0 }));
         uploadFile(file, parentId, (percentage) => {
            setUploadProgress(prevProgress => ({ ...prevProgress, [file.name]: percentage }));
            queryClient.invalidateQueries({ queryKey: ["files"] });
         }).then(response => {
            onFileUploadComplete(response.data);
         });
      });
   };

   return (
      <div className='flex flex-col w-[500px] gap-4'>
         <FileUpload onFilesAdded={handleFilesAdded} />
         <div className='flex overflow-auto flex-col gap-4' style={{ height: containerHeight }}>
            {files.map((file, index) => (
               <FileItem
                  key={index}
                  type={file.type}
                  title={file.name}
                  size={file.size}
                  percentage={uploadProgress[file.name] || 0}
               />
            ))}
         </div>
      </div>
   );
};

export default FileUploadShow;
