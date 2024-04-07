"use client"

import React from 'react';
import AutoInput from '@/components/AutoInput';
import { FormField, FormItem, FormMessage } from "@/components/ui/form";

const FieldRenderer = ({ control, fieldData }) => {
    return (
        <div key={fieldData.name} style={{ width: fieldData.width || '100%' }}>
            <FormField
                control={control}
                name={fieldData.name}
                render={({ field }) => (
                    <FormItem>
                        <AutoInput
                            type={fieldData.type}
                            placeholder={fieldData.placeholder || ''}
                            field={field}
                            label={fieldData.label}
                            items={fieldData.items}
                        />
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    );
}

export default FieldRenderer;
