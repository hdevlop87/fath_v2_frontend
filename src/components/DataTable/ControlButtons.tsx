"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Icon } from '@iconify/react';
import ColumnVisibility from './ColumnVisibility'
import { useSession } from 'next-auth/react';

const ControlButtons = ({ table, onAddItemClick, onDownloadClick, showButtonsList = false }) => {

    const { data: session } = useSession();
    const userRole = (session?.user as any)?.role;
    const isDisabled = userRole !== 'admin';

    return (
        <div className="flex gap-2">
            <ColumnVisibility table={table} />

            {
                showButtonsList &&
                <>
                    <Button size='sm' variant="outline" >
                        <Icon icon='lucide:list' width={18} />
                    </Button>

                    <Button size='sm' variant="outline" >
                        <Icon icon='radix-icons:dashboard' width={18} />
                    </Button>
                </>
            }
            {
                !isDisabled && <>

                    <Button variant="outline" size='sm' onClick={onDownloadClick} >
                        <Icon icon='icon-park-outline:download-two' width={18} />
                    </Button>

                    <Button variant="default" size='sm' className='px-2 py-2 ' onClick={onAddItemClick}>
                        <Icon icon='mdi:add-bold' width={20} />
                    </Button>
                </>
            }

        </div>
    )
}

export default ControlButtons