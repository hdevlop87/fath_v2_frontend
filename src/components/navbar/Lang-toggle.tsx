'use client'
import React, { useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Languages } from 'lucide-react';
import { Icon } from '@iconify/react';
import { useTranslations } from '@/hooks/useTranslations';
import { useI18nStore } from '@/store/i18nStore';

const LangToggle = () => {
    const t = useTranslations();

    const getMenuItemClass = (lang: string) => lang === language ? 'bg-blue-500 text-white' : '';

    const { language, setLanguage } = useI18nStore();
    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, [setLanguage]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Languages width={22} height={22} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t("navbar.languageSelection")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setLanguage('ar')} className={getMenuItemClass('ar')}>
                    <Icon icon="circle-flags:sa" className='w-5 h-5 mr-2' /> {t("navbar.arabic")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('en')} className={getMenuItemClass('en')}>
                    <Icon icon="circle-flags:gb-eng" className='w-5 h-5 mr-2' /> {t("navbar.english")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('fr')} className={getMenuItemClass('fr')}>
                    <Icon icon="circle-flags:fr" className='w-5 h-5 mr-2' /> {t("navbar.french")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('es')} className={getMenuItemClass('es')}>
                    <Icon icon="emojione:flag-for-spain" className='w-5 h-5 mr-2' /> {t("navbar.spanish")}
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default LangToggle