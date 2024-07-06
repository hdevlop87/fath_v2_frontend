"use client"

import React from 'react';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useTranslations } from '@/hooks/useTranslations';

const FieldRenderer = ({ fieldData, formData }) => {

    const t = useTranslations();
    const displayValue = formData[fieldData.name] || "";

    return (
        <div key={fieldData.name} style={{ width: fieldData.width || '100%' }} className='flex flex-col gap-1'>
            <Label className='text-sm font-medium'>{t(fieldData.label)}</Label>
            <Input
                type={'text'}
                value={displayValue}
                readOnly
            />
        </div>
    );
};

export default FieldRenderer;
