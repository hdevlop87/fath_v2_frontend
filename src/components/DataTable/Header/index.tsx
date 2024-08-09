'use client';

import React, { useEffect } from 'react';
import FilterBy from './FilterBy';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import { Label } from '@/components/ui/label';
import useActionsManager from '@/components/Prompts/useActionsManager'
import { useAuthStore } from '@/store/authStore';

const Header = ({ table, filters, setRenderMode, showFilters, title, target, headerAddButton = true, showMode = true }) => {

    const actionsManager = useActionsManager(target);
    console.log(target);
    
    const user = useAuthStore.use.user();
   const isAuthorized = user?.role === 'Admin' || user?.role === 'Editor';

    return (
        <div className="flex justify-between items-center p-1 mb-4">
            {title && <Label className='text-lg'>{title}</Label>}
            {showFilters && <FilterBy table={table} filters={filters} />}
            <div className="flex gap-2">
                {showMode &&
                    <>
                        <Button size='sm' variant="outline" onClick={() => setRenderMode('table')}>
                            <Icon icon='lucide:list' width={18} />
                        </Button>
                        <Button size='sm' variant="outline" onClick={() => setRenderMode('cards')}>
                            <Icon icon='radix-icons:dashboard' width={18} />
                        </Button>
                    </>
                }
                <Button disabled={!isAuthorized} variant="outline" size='sm' onClick={() => actionsManager.Upload({ actionName: "Upload", target })} >
                    <Icon icon='icon-park-outline:download-two' width={18} />
                </Button>
                {headerAddButton &&
                    <Button disabled={!isAuthorized} variant="default" size='sm' className='px-2 py-2 hover:bg-primary-hover' onClick={() => actionsManager.Create({ actionName: "Create", target })}>
                        <Icon icon='mdi:add-bold' width={20} />
                    </Button>
                }
            </div>
        </div>
    );
}

export default Header;
