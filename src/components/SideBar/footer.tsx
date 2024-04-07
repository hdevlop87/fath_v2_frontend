
import React from 'react'
import NavigationLink from './link'
import SubmitButton from '@/components/submitButton';
import { useTranslations } from 'next-intl';
import { useSideBarStore } from '@/store/sidebarStore'

const Footer = () => {

    const t = useTranslations();
    const sidebarState = useSideBarStore.use.sidebarState();

    const status:any = 'test'

    const handleLogout = async () => {

    }

    return (
        <div className="flex flex-col gap-1 p-3 border-t border-accent-200">
            <NavigationLink
                item={{
                    name: "settings",
                    label: t('sidebar.settings'),
                    icon: "ant-design:setting-filled",
                    route: "/dashboard/setting",
                }}
                isCollapsed={sidebarState==='collapsed'}

            />
            <SubmitButton
                submitText={t('button.logoutButton')}
                loadingText={t('button.pleaseWait')}
                className='flex w-full gap-1 justify-start p-2'
                loading={status === 'loading'}
                onClick={handleLogout}
                collapsed={sidebarState==='collapsed'}
                variant='ghost'
            />
        </div>
    )
}
 
export default Footer