'use client'
import { toggleSidebar, useSideBarStore } from '@/store/sidebarStore'
import logodark from '@/assets/logoDark.svg';
import collapsedLogo from '@/assets/collapsedLogo.png';
import { Icon } from '@iconify/react';
import Image from 'next/image';

const Header = () => {

    const sidebarState = useSideBarStore.use.sidebarState();
    const isCollapsed = sidebarState === 'collapsed'

    return (
        <div className='flex justify-center items-center m-2 h-12'>
            {isCollapsed ? (
                <Image src={collapsedLogo} alt="Logo" className='w-9 h-9' />
            ) : (
                <Image src={logodark} alt="Logo" width={48} height={48} />
            )}
            <div className="absolute -right-3 top-[26px] cursor-pointer bg-white rounded-full">
                <Icon icon='bxs:chevron-right-circle' className='text-primary' width={24} rotate={sidebarState === 'collapsed' ? 0 : 90} onClick={toggleSidebar} />
            </div>
        </div>
    );
};

export default Header;