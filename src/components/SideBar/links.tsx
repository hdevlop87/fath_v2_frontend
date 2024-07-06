'use client';

import React from 'react';
import navItems from './navItems.json';
import NavigationLink from './link';
import { useSideBarStore } from '@/store/sidebarStore';

const Links = ({pathname}) => {
    const sidebarState = useSideBarStore.use.sidebarState();

    return (
        <nav className="flex flex-col gap-3 p-3">
            {navItems.map(item => {
                const isActive = pathname === item.route || (item?.nestedRoutes && item.nestedRoutes.some(route => pathname === route));

                return (
                    <NavigationLink
                        key={item.route}
                        item={item}
                        isCollapsed={sidebarState === 'collapsed'}
                        isActive={isActive}
                    />
                );
            })}
        </nav>
    );
};

export default Links;
