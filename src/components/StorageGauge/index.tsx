'use client'

import React from 'react';
import dynamic from 'next/dynamic'
import { Label } from '@/components/ui/label';

const DonutGauge = dynamic(() => import('@/components/DonutGauge'), { ssr: false })


const StorageGauge = ({totalSizeInfo}) => {

    const { totalSize, maxSize, formattedTotalSize, formattedMaxSize } = totalSizeInfo;

    return (
        <div className='gauge flex flex-col relative items-center gap-2'>
            <Label className='text-2xl'>Storage</Label>
            <DonutGauge value={totalSize} maxValue={maxSize} />
            <div className='flex flex-col gap-2 items-center'>
            <Label className='text-2xl'>{formattedTotalSize}</Label>
            <Label className='text-ms text-stone-500'>of {formattedMaxSize} Capacity</Label>
            </div>
        </div>
    );
};

export default StorageGauge;
