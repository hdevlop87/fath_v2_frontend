import { useTranslations } from '@/hooks/useTranslations';
import React from 'react'

const Error = () => {

    const t = useTranslations();

    return (
        <div className="text-center text-red-600">
            <p>{t("errors.noPermission")}</p>
        </div>
    )
}

export default Error