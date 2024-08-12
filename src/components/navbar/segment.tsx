'use client'

import React from 'react'
import { Icon } from '@iconify/react';
import { useTranslations } from '@/hooks/useTranslations';
import { getLastSegment } from '@/lib/utils'
import { setSidebarState, useSideBarStore } from '@/store/sidebarStore';
import { usePathname } from 'next/navigation';

const Segment = () => {
    const t = useTranslations();
    const pathname = usePathname();
    const segment = getLastSegment(pathname);
    const isMobile = useSideBarStore.getState().isMobile;
    
    return (
        <>
            {isMobile ?
                <Icon icon="ri:menu-unfold-3-line-2" width={28} height={28} onClick={() => setSidebarState('open')} />
                :
                <h1 className='font-medium text-lg'>{t("navbar." + segment)}</h1>
            }
        </>
    )
}

export default Segment