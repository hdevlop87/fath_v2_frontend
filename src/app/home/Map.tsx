'use client'

import React, { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import useFetchLotsLandingPage from '@/hooks/subdivision/useFetchLotsLandingPage';
import { Label } from '@/components/ui/label';
import MapManager from '@/map/map/MapManager';
import { useTranslations } from '@/hooks/useTranslations';

const Map = () => {

    const t = useTranslations();
    const { lotsMap, isLoading } = useFetchLotsLandingPage();
    const mapManagerRef = useRef(null);

    const lotClick = (lot) => {
        console.log(lot);
    }

    const initMap = async (lotsData) => {
        mapManagerRef.current = await MapManager.init(lotsData, lotClick);
    };

    const refrechMap = async (lotsData) => {
        if (mapManagerRef.current) {
            await MapManager.recreate(lotsData, lotClick);
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
        <Card className='h-[600px] w-full'>
            <div id="app" className='h-full w-full z-0'></div>
        </Card>
    );
};

export default Map;
