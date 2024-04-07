import React from 'react'
import navItems from './navItems.json';
import NavigationLink from './link';
import { useSideBarStore } from '@/store/sidebarStore'

const Links = () => {

    const sidebarState = useSideBarStore.use.sidebarState();

    return (
        <nav className="flex flex-col gap-3 p-3">
            {navItems.map(item => (
                <NavigationLink
                    key={item.route}
                    item={item}
                    isCollapsed={sidebarState==='collapsed'}
                />
            ))}
        </nav>
    )
}

export default Links