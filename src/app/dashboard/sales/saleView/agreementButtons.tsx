'use client'

import React, { useState } from 'react';
import LoadingButton from "@/components/loadingButton";
import { prepareAgreement, sendEmail } from '@/services/saleApi';
import { Label } from '@/components/ui/label';
import toast from 'react-hot-toast';
import { useTranslations } from '@/hooks/useTranslations';
import { downloadFile } from '@/services/fileApi';
import { usePermissions } from '@/hooks/auth/usePermissions';

const AgreementButtons = ({ sale }) => {

    const t = useTranslations();
    const [loadingAgreement, setLoadingAgreement] = useState(false);
    const [loadingEmail, setLoadingEmail] = useState(false);
    const { can } = usePermissions();

    const getAgreement = async () => {
        try {
            setLoadingAgreement(true);
            const { data } = await prepareAgreement(sale);
            await downloadFile({ name: data.filename, type: 'docx', id: data.id });
        } catch (error) {
            console.error('An error occurred:', error.message);
        } finally {
            setLoadingAgreement(false);
        }
    }

    const sendByEmail = async () => {
        try {
            setLoadingEmail(true);
            let resp = await sendEmail(sale);
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
                <LoadingButton
                    variant="destructive"
                    loading={loadingAgreement}
                    Licon="mdi:paper-text-outline"
                    onClick={getAgreement}
                    submitText="Download"
                    loadingText="Download..."
                    collapsed={false}
                    disabled={!can("download_agreement")}
                />
                <LoadingButton
                    variant="default"
                    loading={loadingEmail}
                    Licon="mdi:email-plus"
                    onClick={sendByEmail}
                    submitText="Email"
                    loadingText="Sending..."
                    collapsed={false}
                    disabled={!can("send_agreement")}
                />
            </div>
        </div>
    )
}

export default AgreementButtons;
