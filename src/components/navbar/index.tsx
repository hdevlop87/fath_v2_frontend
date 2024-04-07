'use client'

import React from 'react'
import BadgeIcon from '@/components/ui/BadgeIcons';
import SearchBar from '@/components/ui/SearchBar'
import Avatar from '@/components/ui/Avatars'
import MyAvatar from '@/assets/avatar1.svg'
import { usePathname } from 'next/navigation';
import { Card, } from "@/components/ui/card"
import { ThemeToggle } from './theme-toggle';
import { Icon } from '@iconify/react';
import { Button } from '../ui/button';
import { setSidebarState,useSideBarStore } from '@/store/sidebarStore'

const getLastSegment = (pathname: string) => {
    const segments = pathname.split('/').filter(segment => !/^[0-9a-fA-F-]+$/.test(segment));
    const segment = segments[segments.length - 1] || segments[segments.length - 2];
    return segment.charAt(0).toUpperCase() + segment.slice(1);
}

const Navbar = () => {

    const pathname = usePathname();
    const segment = getLastSegment(pathname);
    const mediaQuery = useSideBarStore.use.mediaQuery();
    const isMobile = mediaQuery === 'mobile'

    return (
        <Card className='flex h-[56px] justify-between items-center px-4 w-full mt-3'>

            {isMobile ? ( // Render button in mobile view
                <Button variant='ghost' onClick={() => setSidebarState('open')}>
                    <Icon icon="ri:menu-unfold-3-line-2" width={28} height={28} />
                </Button>
            ) : ( // Render h1 on large screens
                <h1 className='font-medium text-lg'>{segment}</h1>
            )}

            <div className='flex items-center gap-3'>
                <div className='hidden md:flex'>
                    <SearchBar />
                </div>
                <div className='flex gap-1 '>
                    <BadgeIcon icon="tabler:minimize" />
                    <ThemeToggle />
                    <BadgeIcon icon="ic:outline-mail" number={5} />
                    <BadgeIcon icon="bx:bell" number={2} color='orange' />
                    <BadgeIcon icon="ic:baseline-g-translate" />
                </div>
                <Avatar avatarUrl={MyAvatar} status='online' />
            </div>

        </Card>

    )
}

export default Navbar
