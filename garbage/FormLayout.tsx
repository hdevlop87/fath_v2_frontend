"use client"

import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { usePromptStore } from '@/store/promptStore';
import { Button } from '@/components/ui/button';
import SubmitButton from '@/components/loadingButton'
import { useTranslations } from '@/hooks/useTranslations';
import { useLoaderStore } from '@/store/loaderStore';


const FormLayout = ({ Form, target }) => {

    const title = useFormStore.use.title();
    const onSubmit = useFormStore.use.onSubmit();
    const isOpen = useFormStore.use.isOpen();
    const setFormOpen = useFormStore.use.setFormOpen();
    const queryLoading = useLoaderStore.use.queryLoading();
    const t = useTranslations();
 
    const handleOpenChange = () => {
        setFormOpen(!isOpen);
    };

    useEffect(() => {
        if (!queryLoading) {
            setFormOpen(false);
        } 
    }, [queryLoading]);

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className='bg-white flex flex-col items-center gap-8'>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <Form type={`form-${target}`} handleSubmit={onSubmit} />

                <div className='flex gap-4 w-full justify-end'>
                    <SubmitButton
                        submitText={t('button.submit')}
                        loadingText={t('button.pleaseWait')}
                        className='gap-1'
                        loading={queryLoading}
                        form={`form-${target}`}
                    />

                    <Button variant='destructive' onClick={handleOpenChange}>{t('button.cancel')}</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FormLayout;