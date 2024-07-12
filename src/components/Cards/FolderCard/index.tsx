'use client'

import React from 'react';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/lib/utils';
import { iconMapping } from '@/components/icons';
import { useNavigationStore } from '@/store/folderNavigationStore';
import { useTranslations } from '@/hooks/useTranslations';

const FolderCard = ({ item, iconName = "FileFolder", showDate = false }) => {

    const t = useTranslations();
    const { name} = item;

    const translatedNames = ['users', 'expenses', 'payments', 'customers', 'agreements'];
    const displayName = translatedNames.includes(name) ? t(`storage.${name}`) : name;


    const formattedDate = formatDate(item.updatedAt);
    const setParentId = useNavigationStore.use.setParentId();
    const IconComponent = iconMapping[iconName];

    const onCardClick = (event) => {
        event.stopPropagation();
        setParentId(item.id); 
    };

    return (
        <div className='flex flex-col items-center' onClick={onCardClick}>
            {IconComponent && <IconComponent height={120} width={150} />}
            <Label className='text-xs cursor-pointer'>{displayName}</Label>

            {showDate && <Label className='text-xs cursor-pointer text-slate-500'>{formattedDate}</Label>}
        </div>
    );
};

export default FolderCard; 
