'use client';

import { useRef } from 'react'

import useSidebar from '@/hooks/useSidebar';
import { cva } from 'class-variance-authority'
import { useOnClickOutside } from 'usehooks-ts'
import { setSidebarState } from '@/store/sidebarStore'

const Wrapper = ({ children }: { children: any }) => {

    const { sidebarState, mediaQuery } = useSidebar();
    const ref = useRef(null)
    const sidebarVariants = cva(
        "flex flex-col  bg-card dark text-foreground left-0 h-full z-40  transition-width duration-200 justify-between py-2 ",
        {
            variants: {
                variant: {
                    openLargeScreen:
                        "w-48 relative",
                    openMobile:
                        "w-48 absolute ",
                    collapsed:
                        "w-16 relative",
                    hidden:
                        "-translate-x-48 absolute",
                },
            },
            defaultVariants: {
                variant: "openLargeScreen",
            },
        }
    );

    const getVariant = () => {
        let variant;
        switch (true) {
            case mediaQuery === 'largeScreen' && sidebarState === 'open':
                variant = 'openLargeScreen';
                break;
            case mediaQuery === 'mobile' && sidebarState === 'open':
                variant = 'openMobile';
                break;
            case sidebarState === 'collapsed':
                variant = 'collapsed';
                break;
            default:
                variant = 'hidden';
        }
        return variant;
    };

    const handleClickOutside = () => {
        if (mediaQuery !== 'mobile') return;
        setSidebarState('hidden')
    }

    useOnClickOutside(ref, handleClickOutside)

    return (
        <div ref={ref} className={sidebarVariants({ variant: getVariant() })}>
            {children}
        </div>
    )
}

export default Wrapper