'use client'

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import useFetchLotsMap from '@/hooks/subdivision/useFetchLotsMap';
import { Label } from '@/components/ui/label';
import MapManager from '@/map/map/MapManager';
import { useRouter } from 'next/navigation'
import useActionsManager from '@/components/Prompts/useActionsManager'
import { useTranslations } from '@/hooks/useTranslations';

const Map = () => {

    const t = useTranslations();
    const { lotsMap, isLoading } = useFetchLotsMap();
    const actionsManager = useActionsManager("wizardSale");
    const mapManagerRef = useRef(null);
    const router = useRouter();

    const submitNewSale = async (lotInfo) => {
        const { saleId } = lotInfo;
        if (saleId) {
            router.push(`/dashboard/sales/saleView?saleID=${saleId}`);
            return;
        }
        const { lotId, pricePerM2, lotRef } = lotInfo;
        router.push(`/dashboard/sales`);
        actionsManager.Create({ lotId, pricePerM2, lotRef });
    };

    const initMap = async (lotsData) => {
        mapManagerRef.current = await MapManager.init(lotsData, submitNewSale);
    };

    const refrechMap = async (lotsData) => {
        if (mapManagerRef.current) {
            await MapManager.recreate(lotsData, submitNewSale);
        } else {
            await initMap(lotsData);
        }
    };

    useEffect(() => {
        if (!isLoading && lotsMap) {
            refrechMap(lotsMap);
        }
        return () => {
            if (mapManagerRef.current) {
                MapManager.removeInstance();
                mapManagerRef.current = null;
            }
        };
    }, [isLoading, lotsMap]);

    if (isLoading) return <>loading...</>;

    return (
        <Card className='h-full w-full'>
            <div className='p-3 rounded-lg absolute w-auto z-10 shadow-lg border flex gap-4 bg-slate-50 dark:bg-black'>
                <div className='flex items-center gap-3'>
                    <div className='w-[30px] h-[20px] border-2 bg-[#f5eed3]' />
                    <Label className='text-sm'>{t("status.available")}</Label>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-[30px] h-[20px] border-2 bg-[#ffff00]' />
                    <Label className='text-sm'>{t("status.reserved")}</Label>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-[30px] h-[20px] border-2 bg-orange-500' />
                    <Label className='text-sm'>{t("status.ongoing")}</Label>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-[30px] h-[20px] border-2 bg-green-500' />
                    <Label className='text-sm'>{t("status.sold")}</Label>
                </div>
                <div className='flex items-center gap-3'>
                    <div className='w-[30px] h-[20px] border-2 bg-red-500' />
                    <Label className='text-sm'>{t("status.canceled")}</Label>
                </div>
            </div>
            <div id="app" className='h-full w-full z-0'></div>
        </Card>
    );
};

export default Map;
