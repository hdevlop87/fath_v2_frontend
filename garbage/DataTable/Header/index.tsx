'use client'

import React from 'react';
import FilterBy from './FilterBy';
import { Button } from '@/components/ui/button';
import { Icon } from '@iconify/react';
import ColumnVisibility from './ColumnVisibility';
import { useActionsStore } from '@/store/dataTable'

const Header = ({ table, filters, setRenderMode }) => {
    
    const onCreate = useActionsStore.use.onCreate();
    const onDownload = useActionsStore.use.onCreate();

    return (
        <>
            <div className="flex justify-between items-center mb-4">
                <FilterBy table={table} filters={filters} />
                <div className="flex gap-2">
                    {/* <ColumnVisibility table={table} /> */}

                    <Button size='sm' variant="outline" onClick={() => setRenderMode('table')}>
                        <Icon icon='lucide:list' width={18} />
                    </Button>

                    <Button size='sm' variant="outline" onClick={() => setRenderMode('cards')}>
                        <Icon icon='radix-icons:dashboard' width={18} />
                    </Button>

                    <Button variant="outline" size='sm' onClick={onDownload} >
                        <Icon icon='icon-park-outline:download-two' width={18} />
                    </Button>

                    <Button variant="default" size='sm' className='px-2 py-2 ' onClick={onCreate}>
                        <Icon icon='mdi:add-bold' width={20} />
                    </Button>
                </div>
            </div>
        </>
    );
}

export default Header;