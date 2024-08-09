'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useI18nStore } from '@/store/i18nStore';
import { useTranslations } from '@/hooks/useTranslations';
import { Download } from 'lucide-react';

const NavItems = ['Home', 'About', 'Services', 'Contact'];

const Navbar = () => {

    const t = useTranslations();
    const router = useRouter();

    const { language, setLanguage } = useI18nStore();

    const getMenuItemClass = (lang: string) => lang === language ? 'bg-blue-500 text-white' : '';

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, [setLanguage]);

    return (
        <nav className="flex w-full items-center bg-white justify-between fixed py-2 mx-auto pr-10 lg:px-20  z-30 ">

            <Icon icon="fluent:line-horizontal-3-20-filled" width={24} height={24}/>

            <div className='flex items-center gap-3 cursor-pointer' onClick={() => router.push('/')}>
                <Image src={logo} width={64} height={64} alt='logo' />
            </div>

            <Icon icon="ic:outline-mail" className='text-gray-700' width={24} height={24}/>

            <ul className='hidden gap-8 items-center text-base lg:flex '>
                {NavItems.map((item, index) => (
                    <li key={index}>
                        <a className='hover:text-primary cursor-pointer' >{item}</a>
                    </li>
                ))}
            </ul>

        </nav>
    )
}

export default Navbar