import React from 'react'
import FileUploadShow from '@/components/Forms/FileUploadForm';
import { Label } from '@/components/ui/label';

const CSVUploader = ({handleSubmit}) => {

    const onFileUploadComplete = (fileDetails) => {
        handleSubmit(fileDetails)
    }

    return (
        <>
            <FileUploadShow onFileUploadComplete={onFileUploadComplete} />
            <div className='flex w-full justify-between'>
                <Label className='text-xs text-stone-400'>Supported formats (XLS,XLSX,CSV )</Label>
                <Label className='text-xs text-stone-400'>Maximum size: 150MB</Label>
            </div>
        </>
    )
}

export default CSVUploader 