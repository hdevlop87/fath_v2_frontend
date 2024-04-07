'use client'

import React, { useEffect } from 'react'
import { Card } from '@/components/ui/card';
import useFetchLots from '@/hooks/useFetchLots';
import { useRouter } from 'next/navigation'
import { Label } from '@/components/ui/label';
import lotsData from '@/map/map/lots.json';
import MapManager from '@/map/map/MapManager'
import { Button } from '@/components/ui/button';
import { useSideBarStore } from '@/store/sidebarStore'

const Map = () => {



    useEffect(() => {
        let scene;
        const initMap = async () => {
            scene = await MapManager.init(lotsData, submitNewSale);
        };
        initMap();
        return () => {
            if (scene) {
                MapManager.removeInstance();
            }
        };
    }, []);
    

    const submitNewSale = async (lotInfo) => {
        console.log(lotInfo);
    }

    const refrech = async () => {
        await MapManager.recreate(lotsData, submitNewSale)
    }

    return (
        <>
            <Card className='h-full w-full'>
                <div className='p-3 rounded-lg absolute w-auto  z-50 shadow-lg border ] flex gap-4 bg-slate-50 dark:bg-black'>

                    <div className='flex items-center gap-3'>
                        <div className='w-[30px] h-[20px]  border-2 bg-[#f5eed3]' />
                        <Label className='text-sm'>Disponible</Label>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='w-[30px] h-[20px]  border-2 bg-[#ffff00]' />
                        <Label className='text-sm'>Réservé</Label>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='w-[30px] h-[20px]  border-2 bg-orange-500' />
                        <Label className='text-sm'>Vendu</Label>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='w-[30px] h-[20px]  border-2 bg-green-500' />
                        <Label className='text-sm'>Clôturé</Label>
                    </div>

                    <div className='flex items-center gap-3'>
                        <div className='w-[30px] h-[20px]  border-2 bg-red-500' />
                        <Label className='text-sm'>Annulé</Label>
                    </div>

                </div>

                <div id="app" className='h-full w-full z-0'>
                </div>
            </Card>

            <Button onClick={refrech}>refech</Button>
        </>
    )
}

export default Map