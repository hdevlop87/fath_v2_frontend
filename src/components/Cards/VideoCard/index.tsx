'use client'

import { formatFileSize, truncateFilename } from '@/lib/utils';
import React from 'react';
import { Label } from '@/components/ui/label';
import { Play } from 'lucide-react';
import useActionsManager from '@/components/Prompts/useActionsManager';
import {useDoubleClick} from '@/hooks/useDoubleClick'

const videoCard = ({ item }) => {
    const { name, size, type } = item;

    const actionsManager = useActionsManager(item.target);
    const truncatedFilename = truncateFilename(name, 12);
    const thumbSrc = `thumbnail://${item.thumbnail}`;

    const fileIcon = "/filesIcon/video-player.png";
    const onCardClick = (event) => {
        event.stopPropagation();
        actionsManager.Preview(item);
    };

    const handleClickEvent = useDoubleClick(onCardClick);

    return (
        <div className='flex flex-col gap-2 justify-center bg-stone-400 rounded-xl items-center relative ' onClick={handleClickEvent}>
            <div className='w-[180px] h-[150px]'>
                {item.thumbnail ? (
                    <img src={thumbSrc} alt={name} className='w-full h-full rounded-lg' draggable="false"/>
                ) : (
                    <div className='flex w-full h-full items-center justify-center'>
                        <img src={fileIcon} alt={name} className='w-[80px] h-[80px] rounded-lg' draggable="false" />
                    </div>
                )}
            </div>
            <div className='flex items-center bg-black w-full rounded-xl absolute bottom-0 p-2 justify-between bg-opacity-70'>
                <div className='flex flex-col'>
                    <Label className='text-sm text-stone-300'>{truncatedFilename}.{type}</Label>
                    <Label className='text-xs text-stone-400'>{formatFileSize(size)}</Label>
                </div>
                <div className='flex w-7 h-7 bg-primary rounded-full justify-center items-center active:scale-90' onClick={onCardClick}>
                    <Play className='w-4 h-4 text-white cursor-pointer ' />
                </div>
            </div>
        </div>
    );
};

export default videoCard;
