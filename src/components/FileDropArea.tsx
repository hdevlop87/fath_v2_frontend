"use client"
import React, { useCallback, useState } from 'react';
import { Label } from '@/components/ui/label';
import { Icon } from '@iconify/react';

interface FileDropAreaProps {
  onFilesAdded: (files: FileList) => void;
}

const FileDropArea: React.FC<FileDropAreaProps> = ({ onFilesAdded }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    setDragOver(false);
    onFilesAdded(event.dataTransfer.files);
  }, [onFilesAdded]);
  

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOver(false);
  }, []);

  const handleFileSelect = (event) => {
    onFilesAdded(event.target.files);
  };

  return (
    <div className={`flex flex-col min-w-[400px] p-8 border-stone-300 bg-card border-2 justify-center items-center gap-4 rounded-md cursor-pointer ${dragOver ? 'border-secondary' : 'border-dashed'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => document.getElementById('file-upload').click()}
    >
      <Icon icon="lucide:upload" className="text-orange-500 h-12 w-12 p-2 bg-gray-300 rounded-full" />
      <div className="flex flex-col justify-center items-center cursor-pointer" >
        <Label className="text-md cursor-pointer">Drop files here</Label>
        <Label className="text-stone-400 text-xs">
          or <span className=" text-primary text-xs cursor-pointer" >Browse</span> files from your computer
        </Label>
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          style={{ display: 'none' }} 
          onChange={handleFileSelect}
        />
      </div>
    </div>
  );
};

export default FileDropArea;
