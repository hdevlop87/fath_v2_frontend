'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { UploadIcon } from '@radix-ui/react-icons';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";

const UserAvatar = ({ field, onImageChange }) => {

    const extractFileName = (path) => path ? path.split('\\').pop().split('/').pop() : "noavatar.png";

    const [imageSrc, setImageSrc] = useState(field.value ? `${process.env.NEXT_PUBLIC_API_URL}/${field.value}` : "");
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = React.createRef<HTMLInputElement>();
    const [fileName, setfileName] = useState<string>(extractFileName(field.value));

    useEffect(() => {
        if (selectedFile) {
            const reader: any = new FileReader();
            reader.addEventListener('load', () => setImageSrc(reader.result));
            reader.readAsDataURL(selectedFile);
            onImageChange(selectedFile);
        }
    }, [selectedFile, onImageChange]);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setfileName(file.name);
        }
    };

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <Avatar className='w-28 h-28 relative'>
                <AvatarImage src={imageSrc} alt="avatar" />
                <AvatarFallback>
                    <Image
                        src={"/noavatar.png"}
                        alt="no avatar"
                        width={112}
                        height={112}
                        className="z-10"
                    />
                </AvatarFallback>
            </Avatar>
            <Input type="file" ref={fileInputRef} accept="image/*" onChange={handleFileChange} className='hidden' />
            <div className="flex gap-2 border h-9 rounded-lg items-center w-full cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className='flex bg-primary pr-2 pl-2 h-full items-center text-white'>
                    <UploadIcon className="h-5 w-5" />
                </div>
                <Label className='cursor-pointer text-sm text-nowrap overflow-hidden'>{fileName}</Label>
            </div>
        </div>
    );
};

export default UserAvatar;
