// useSidebar.tsx
'use client'
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { setSidebarState, useSideBarStore, setMediaQuery } from '@/store/sidebarStore'

export default function useSidebar() {

    const sidebarState = useSideBarStore.use.sidebarState();
    const mediaQuery = useSideBarStore.use.mediaQuery();
    const isLargeScreen = useMediaQuery({ minWidth: 1024 });
    const isMobile = useMediaQuery({ maxWidth: 640 });

    useEffect(() => {
        setSidebarState(isMobile ? 'hidden' : isLargeScreen ? 'open' : 'collapsed');
        setMediaQuery(isMobile ? 'mobile' : 'largeScreen');

    }, [isLargeScreen, isMobile]);

    return { sidebarState, mediaQuery };
}
