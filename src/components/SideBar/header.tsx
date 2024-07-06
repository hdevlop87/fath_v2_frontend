'use client'
import { toggleSidebar, useSideBarStore } from '@/store/sidebarStore'
import cloud from '@/assets/cloud.png';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { Label } from '../ui/label';
import { useSpring, animated } from '@react-spring/web';
import useFetchSettings from '@/hooks/subdivision/useFetchSettings';

const Header = () => { 

    const { settings } = useFetchSettings()
    const sidebarState = useSideBarStore.use.sidebarState();
    const isCollapsed = sidebarState === 'collapsed';

    const labelStyle = useSpring({
        opacity: isCollapsed ? 0 : 1,
        config: { tension: 210, friction: 20 }
    });

    return (
        <div className='flex justify-start items-center m-2 h-20 pl-1'>
            <div className='flex flex-col justify-center items-center w-full'>
                <Image src={cloud} alt="Logo" className='w-9 h-9' />
                <animated.div style={labelStyle} className={`ml-2 overflow-hidden ${isCollapsed ? 'w-0' : 'w-auto'}`}>
                    <div className="whitespace-nowrap">
                        <Label className='text-lg'>{settings.appName}</Label>
                    </div>
                </animated.div>
            </div>
            <div className="absolute -right-3 top-[26px] cursor-pointer bg-white rounded-full">
                <Icon icon='bxs:chevron-right-circle' className='text-primary' width={24} rotate={sidebarState === 'collapsed' ? 0 : 90} onClick={toggleSidebar} />
            </div>
        </div>
    );
};

export default Header;
