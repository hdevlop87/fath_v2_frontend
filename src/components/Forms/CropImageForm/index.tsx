"use client"

import React, { useState, useEffect } from 'react';
import ImageCropper from '@/components/CropImage';
import FileDropArea from '@/components/FileDropArea';
import { useForm } from "react-hook-form";
import { usePromptStore } from '@/store/promptStore';

const CropImageForm = ({ target, handleSubmit }) => {
  
  const initialValues = usePromptStore.use.initialValues();
  const [imageSrc, setImageSrc] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const form = useForm({
    defaultValues: initialValues
  });

  useEffect(() => {
    if (selectedFile) {
      const reader:any = new FileReader();
      reader.addEventListener('load', () => setImageSrc(reader.result));
      reader.readAsDataURL(selectedFile);
    }
  }, [selectedFile]);

  const onFilesAdded = (files) => {
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const onSubmit = async () => {
    if (croppedImage) {
      
     // handleSubmit(croppedImage);
    }
  };

  return (
    <div className='flex flex-col'>
      <form id={`form-${target}`} onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full">
        {!imageSrc ? (
          <FileDropArea onFilesAdded={onFilesAdded} />
        ) : (
          <>
            <ImageCropper src={imageSrc} onCropComplete={(croppedImageUrl) => setCroppedImage(croppedImageUrl)} />
          </>
        )}
      </form>
    </div>
  );
};

export default CropImageForm;
