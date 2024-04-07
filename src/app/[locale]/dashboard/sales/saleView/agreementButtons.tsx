'use client'

import React, { useState } from 'react';
import LoadingButton from "@/components/loadingButton";
import { getAgreementByData, sendEmail } from '@/services/salesApi';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { useTranslations } from 'next-intl';


const agreementButtons = ({ data }) => {
    const t = useTranslations();
    const [loadingAgreement, setLoadingAgreement] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);

    let { firstName, lastName } = data.customer;
    let nameFile = `${firstName}_${lastName}.docx`;

    const getAgreement = async () => {
        try {
            setLoadingAgreement(true);
            const blob: any = await getAgreementByData(data);
            const url = URL.createObjectURL(blob);
            if (url) {
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', nameFile);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        } catch (error) {
            console.error('An error occurred:', error.message);
        } finally {
            setLoadingAgreement(false);
        }
    }

    const sendByEmail = async () => {
        try {
            setLoadingEmail(true);
            let resp = await sendEmail(data);
            toast.success(t(resp.message));
            
        } catch (error) {
            console.error('An error occurred:', error);
        } finally {
            setLoadingEmail(false);
        }
    }

    return (
        <div className='flex flex-col gap-4'>
            <Label className='font-bold'>Compromis de Vente:</Label>
            <div className='flex gap-4'>
                <LoadingButton variant='destructive' title='Télécharger' loading={loadingAgreement} icon='mdi:paper-text-outline' onClick={getAgreement} />
                <LoadingButton variant='default' title='Envoyer' loading={loadingEmail} icon='mdi:email-plus' onClick={sendByEmail} />
            </div>
        </div>
    )
}

export default agreementButtons