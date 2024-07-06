'use client'

import React  from 'react'
import { useActionsStore } from '@/store/dataTable'

const Cards = ({ table, Card }) => {

    const onDelete = useActionsStore.use.onDelete();
    const onUpdate = useActionsStore.use.onUpdate();
    const onRead = useActionsStore.use.onRead();

    return (
        <div className='flex flex-wrap gap-6'>
            {
                table.getRowModel().rows.map((row) => (
                    <Card key={row.id} row={row} onRead={onRead} onDelete={onDelete} onUpdate={onUpdate}/>
                ))
            }
        </div>
    )
}

export default Cards