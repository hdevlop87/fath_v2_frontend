import { Label } from '@/components/ui/label'
import { Icon } from '@iconify/react/dist/iconify.js'
import React from 'react'

const Apercu = () => {
    return (
        <div className='flex flex-col gap-4'>
            <Label className='text-lg'>A Propos </Label>

            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                    <Icon icon="teenyicons:floorplan-solid" className='w-6 h-6 text-gray-500'/>
                    <Label className='text-sm'>De 90 a 266 m2</Label>
                </div>
                <div className='flex gap-2 items-center'>
                    <Icon icon="fontisto:date" className='w-6 h-6 text-gray-500' />
                    <Label className='text-sm '>Année de construction :</Label>
                    <Label className='text-sm font-normal text-gray-700'>en cours </Label>
                </div>

                <div className='flex gap-2 items-center'>
                <Icon icon="fontisto:date" className='w-6 h-6 text-gray-500' />
                    <Label className='text-sm'>Année de Livraison :</Label>
                    <Label className='text-sm font-normal text-gray-700'>janvier 2025 </Label>
                </div>

            </div>
        </div>
    )
}

export default Apercu