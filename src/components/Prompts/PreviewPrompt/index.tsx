import React from 'react'
import { usePromptStore } from '@/store/promptStore';
import Image from "next/image";

const Preview = () => {

    const file = usePromptStore.use.initialValues();
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const filePath = `${baseUrl}/${file?.path.replace(/\\/g, '/')}`;

    return (
        <div>
            <img src={filePath} alt={file?.filename} className="thumbnail" width={200} height={200} />
        </div>
    )
}

export default Preview