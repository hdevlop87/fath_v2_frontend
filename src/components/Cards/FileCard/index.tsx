'use client'

import { formatFileSize, truncateFilename } from '@/lib/utils';
import React from 'react';
import Image from "next/image";
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';


const FileCard = ({ item }) => {

    const { name, size, type } = item;

    const truncatedFilename = truncateFilename(name, 12);

    return (
        <Card className='flex flex-col gap-2 p-3 w-[140px] h-[140px] justify-center items-center'>
            <Image src={`/filesIcon/${item.icon}`} width={70} height={70} alt="icon" />
            <div className='flex flex-col gap-1'>
                <Label className='text-sm cursor-pointer text-center truncate'>{truncatedFilename}.{type}</Label>
                <Label className='text-xs cursor-pointer text-slate-600'>{formatFileSize(size)}</Label>
            </div>
        </Card>
    );
};

export default FileCard;
