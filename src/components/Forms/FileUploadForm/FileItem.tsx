"use client"
import React from 'react';
import { Progress } from "@/components/ui/progress";
import MimetypeImage from '@/components/MimetypeImage';
import { Label } from '../../ui/label';
import { formatFileSize } from '@/lib/utils';

interface FileItemProps {
  type: string;
  title: string;
  size: number;
  percentage: number;
}

const FileItem: React.FC<FileItemProps> = ({ type, title, size, percentage }) => {
  return (
    <div className='file flex w-full h-[86px] border rounded-md p-3 gap-2'>
      <MimetypeImage type={type} className='w-11 h-11' />
      <div className='flex flex-col w-full gap-1'>

        <div className='flex flex-col w-[380px] gap-1'>
          <Label className='flex truncate h-4'>{title}</Label>
          <Label>{formatFileSize(size)}</Label>
        </div>

        <div className="flex items-center gap-2">
          <Progress value={percentage} className="w-full bg-slate-200 h-[6px]" />
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default FileItem;
