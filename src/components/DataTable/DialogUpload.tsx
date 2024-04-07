"use client"
import React from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from '@/components/ui/dialog';
import useDialogStore from '@/store/dialogStore';

const DialogUpload = ({ children, description = '' }) => {

  const { uploadOpen, setUploadOpen } = useDialogStore();

  const handleOpenChange = () => {
    setUploadOpen(!uploadOpen)
  };

  return (

    <Dialog open={uploadOpen} onOpenChange={handleOpenChange}>
      <DialogContent className='bg-white flex flex-col items-center'>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>

  );
};

export default DialogUpload;