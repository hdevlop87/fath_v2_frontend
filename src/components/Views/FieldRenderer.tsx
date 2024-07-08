"use client"

import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useTranslations } from '@/hooks/useTranslations';

const FieldRenderer = ({ fieldData, formData }) => {

    const t = useTranslations();
    const displayValue = formData[fieldData.name] || "";

    return (
        <div key={fieldData.name} style={{ width: fieldData.width || '100%' }} className='flex flex-col gap-1 w-full'>
            <Label className='text-sm font-medium'>{t(fieldData.label)}</Label>
            <div className='flex w-full h-9 border rounded-lg shadow-sm items-center px-3'>
                <Label className='text-sm font-normal'>{displayValue}</Label>
            </div>
        </div>
    );
};

export default FieldRenderer;
