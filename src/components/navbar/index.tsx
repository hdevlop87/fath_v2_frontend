'use client'

import { setSidebarState, useSideBarStore } from '@/store/sidebarStore'
import BadgeIcon from '@/components/ui/BadgeIcons';
import SearchBar from '@/components/ui/SearchBar'
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import MyAvatar from '@/assets/avatar1.svg'
import { Icon } from '@iconify/react';
import { Button } from '../ui/button';
import React from 'react'
import { useTranslations } from '@/hooks/useTranslations';
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";

const getLastSegment = (pathname: string) => {
    const segments = pathname.split('/').filter(segment => !/^[0-9a-fA-F-]+$/.test(segment));
    const segment = segments[segments.length - 1] || segments[segments.length - 2];
    return segment.charAt(0).toUpperCase() + segment.slice(1);
}

const Navbar = () => {

    const t = useTranslations();
    const pathname = usePathname();
    const segment = getLastSegment(pathname);
    const mediaQuery = useSideBarStore.use.mediaQuery();
    const isMobile = mediaQuery === 'mobile'
    const user = useAuthStore.use.user();

    return (
        <div className='flex h-[56px] justify-between items-center px-4 w-full'>

            {isMobile ? (
                <Button variant='ghost' onClick={() => setSidebarState('open')}>
                    <Icon icon="ri:menu-unfold-3-line-2" width={28} height={28} />
                </Button>
            ) : (
                <h1 className='font-medium text-lg'>{t(`navbar.${segment}`)}</h1>
            )}

            <div className='flex items-center gap-3'>
                <div className='hidden md:flex'>
                    <SearchBar />
                </div>
                <div className='flex gap-1 '>
                    <ThemeToggle />
                    <BadgeIcon icon="ic:baseline-g-translate" />
                </div>

                <Avatar className='w-10 h-10 relative'>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`} alt="avatar" />
                    <AvatarFallback>
                        <Image
                            src={"/noavatar.png"}
                            alt="no avatar"
                            width={40}
                            height={40}
                            className="z-10"
                        />
                    </AvatarFallback>
                </Avatar>
                
               
            </div>

        </div>

    )
}

export default Navbar
