'use client'

import { formatFileSize, truncateFilename } from '@/lib/utils';
import React from 'react';
import { Label } from '@/components/ui/label';
import useActionsManager from '@/components/Prompts/useActionsManager';
import { useDoubleClick } from '@/hooks/useDoubleClick'

const ImageCard = ({ item }) => {

    const actionsManager = useActionsManager(item.category);
    const { name, size, type } = item;

    const thumbSrc = `${process.env.NEXT_PUBLIC_API_URL}/${item.path}`;

    const truncatedFilename = truncateFilename(name, 16);

    const onCardClick = (event) => {
        event.stopPropagation();
        actionsManager.Preview(item);
    };

    const handleClickEvent = useDoubleClick(onCardClick);

    return (
        <div className='flex flex-col gap-2 justify-center bg-stone-400 rounded-xl items-center relative w-[140px] h-[140px]' onClick={handleClickEvent}>
            <img src={thumbSrc} alt={name} className='w-full h-full rounded-lg' draggable="false" />
            <div className='flex flex-col bg-black w-full rounded-xl absolute bottom-0 p-2 bg-opacity-70'>
                <Label className='text-sm text-stone-300'>{truncatedFilename}.{type}</Label>
                <Label className='text-xs text-stone-400'>{formatFileSize(size)}</Label>
            </div>
        </div>
    );
};

export default ImageCard;
