'use client';
import React from 'react'
import NavigationLink from './link'
import SubmitButton from '@/components/loadingButton';
import { useTranslations } from '@/hooks/useTranslations';
import { useSideBarStore } from '@/store/sidebarStore'
import { queryClient } from '@/providers/QueryClientProvider';
import { logout, useAuthStore } from '@/store/authStore'
import { useLoaderStore } from '@/store/loaderStore'


const Footer = ({pathname}) => {

    const t = useTranslations();
    const sidebarState = useSideBarStore.use.sidebarState();
    const isLoading = useLoaderStore.use.isLoading();

    const user = useAuthStore.use.user();
    const isAdmin = user?.role === 'Admin';

    const handleLogout = async () => {
        queryClient.removeQueries();
        await logout()
    }

    return (
        <div className="flex flex-col gap-1 p-3 border-t border-accent-200">
            <NavigationLink
                item={{
                    name: "settings",
                    label: 'settings',
                    icon: "ant-design:setting-filled", 
                    route: "/dashboard/settings",
                }}
                isCollapsed={sidebarState==='collapsed'}
                isActive={pathname === "/dashboard/settings"}
            />
            
            <SubmitButton
                submitText={t('button.logoutButton')}
                loadingText={t('button.pleaseWait')}
                className='flex w-full gap-1 justify-start p-2'
                loading={isLoading}
                onClick={handleLogout}
                collapsed={sidebarState==='collapsed'}
                variant='ghost'
            />
        </div>
    )
}
 
export default Footer