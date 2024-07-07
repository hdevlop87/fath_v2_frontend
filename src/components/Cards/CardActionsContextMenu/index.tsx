import React from 'react';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuSeparator,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Icon } from '@iconify/react';
import useActionsManager from '@/components/Prompts/useActionsManager'


interface CardActionsContextMenuProps {
    target: string;
    possibleActions: string[];
    data?: any;
    children: React.ReactNode;
}

const CardActionsContextMenu: React.FC<CardActionsContextMenuProps> = ({ target, possibleActions = [], data, children }) => {

    const actionsManager = useActionsManager(target);

    const actionConfig = {
        Star: { icon: "eva:star-outline" },
        Read: { icon: "eva:eye-outline" },
        Preview: { icon: "eva:eye-outline" },
        Update: { icon: "eva:edit-2-outline" },
        Rename: { icon: "eva:edit-2-outline" },
        Delete: { icon: "fluent:delete-24-regular" }, 
        Download: { icon: "eva:download-outline" },
        Move: { icon: "eva:move-outline" },
        Restore: { icon: "mage:reload-reverse" },
    };

    const handleAction = (actionName) => (event) => {
        event.stopPropagation();
        actionsManager[actionName](data);
     };

    return (
        <ContextMenu>
            <ContextMenuTrigger asChild>
                {children}
            </ContextMenuTrigger>
            <ContextMenuContent className="w-56">
                <ContextMenuLabel>Actions</ContextMenuLabel>
                <ContextMenuSeparator />
                {possibleActions.map(actionName => (
                    <ContextMenuItem className='cursor-pointer' key={actionName} onClick={handleAction(actionName)}>
                        <Icon icon={actionConfig[actionName]?.icon} width={18} className='mr-2' />
                        {actionName}
                    </ContextMenuItem>
                ))}
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default CardActionsContextMenu;