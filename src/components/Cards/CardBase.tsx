// File: components/Common/CardBase.tsx
'use client';

import CardActionsContextMenu from './CardActionsContextMenu';
import { useSelectStore } from '@/store/selectItemStore';
import { Checkbox } from "@/components/ui/checkbox";
import CardActionsDropdown from './CardActions';
import cardsMapping from './cardsMapping';
import configMapping from '@/config';
import { cn } from '@/lib/utils';
import React from 'react';


interface CardBaseProps {
    item: any;
    showAction?: boolean;
    showCheckbox?: boolean;
    target?: string; 
}

const CardBase: React.FC<CardBaseProps> = ({ item, showAction = false, showCheckbox = true, target }) => {
    
    const { selectedItems, toggleItemSelection } = useSelectStore();
    const categoryKey = item.category || target;
    const CardComponent = cardsMapping[categoryKey];
    const config = configMapping[categoryKey];
    const possibleActions = config.possibleActions;
    const isChecked = selectedItems.includes(item);

    const handleCheckboxChange = () => {
        toggleItemSelection(item);
    };

    return (
        <CardActionsContextMenu key={item.id} target={categoryKey} possibleActions={possibleActions} data={item}>
            <div className={cn("flex gap-2 relative group")}>
                {showCheckbox && (
                    <Checkbox
                        checked={isChecked}
                        onCheckedChange={handleCheckboxChange}
                        aria-label="Select row"
                        className={cn('absolute z-10 top-2 left-2 transition-opacity duration-300', {
                            'opacity-100': isChecked,
                            'opacity-0 group-hover:opacity-100': !isChecked
                        })}
                    />
                )}
                {showAction && <CardActionsDropdown target={categoryKey} possibleActions={possibleActions} data={item} />}
                {CardComponent ? <CardComponent item={item} /> : <div>Unknown Card Type</div>}
            </div>
        </CardActionsContextMenu>
    );
};

export default CardBase;
