import { Icon } from '@iconify/react';
import React, { useRef, useState } from 'react'
import { Label } from "@/components/ui/label"
import { Button } from '@/components/ui/button'
import Papa from 'papaparse';

const FileReaderUpload = ({ onFileParsed }) => {

   const fileInputRef = useRef<HTMLInputElement>(null);
   const [fileName, setFileName] = useState(null);
   const [parsedData, setParsedData] = useState<any[]>([]);

   const handleDrop = (event) => {
      event.preventDefault();
      const file = event.dataTransfer.files[0];
      setFileName(file.name);
      parseFile(file);

   };

   const handleFileChange = (event) => {
      const file = event.target.files[0];
      setFileName(file.name);
      parseFile(file);
   };

   const parseFile = (file) => {
      Papa.parse(file, {
         header: true,
         complete: (result) => {
            if (onFileParsed) {
               setParsedData(result.data);
            }
         },
         error: (error) => {
            console.error("Error parsing file:", error);
         }
      });
   };

   const handleUploadClick = () => {
      if (onFileParsed) {
         onFileParsed(parsedData);
      }
   };

   return (
      <div className='flex flex-col gap-8 w-[350px]'>

         <Label className='text-md'>Upload file</Label>
         <div
            className='flex flex-col gap-8 justify-center items-center w-full h-[300px] border-dashed border-2 border-gray-300 hover:border-sky-500 rounded-xl'
            onDrop={handleDrop}
            onDragOver={(event) => event.preventDefault()}
         >

            <Icon icon="fa-solid:file-upload" width={48} className={fileName ? "text-primary" : "fill-foreground"} />

            {
               fileName ? (
                  <Label >{fileName}</Label>
               ) : (
                  <div className='flex flex-col items-center gap-2'>
                     <Label>Drag and Drop file here </Label>
                     ----- OR -----
                     <Button variant="outline" onClick={() => { fileInputRef.current?.click() }}>Browse file</Button>
                     <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                     />
                  </div>
               )
            }
         </div>

         <div className="flex w-full justify-between">
            <Label className='text-xs'>Supported formats XLS,XLSX,CSV</Label>
            <Label className='text-xs'>Maximum size: 50MB</Label>
         </div>

         <div className='flex gap-4'>
            <Button variant="outline" onClick={() => setFileName(null)}>Cancel</Button>
            <Button onClick={handleUploadClick}>Upload</Button>
         </div>

      </div>
   )
}

export default FileReaderUpload