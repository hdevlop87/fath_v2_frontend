import React from 'react';
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icon } from '@iconify/react';
import useActionsManager from '@/components/Prompts/useActionsManager'
import { cn } from '@/lib/utils';

interface CardActionsDropdownProps {
   target: string;
   possibleActions: string[];
   data?: any;
   className?: any
}

const CardActionsDropdown: React.FC<CardActionsDropdownProps> = ({ target, possibleActions = [], data, className }) => {

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
      <>
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Icon icon="pepicons-pencil:dots-y" width={28} className={cn('mr-2 cursor-pointer z-20 absolute top-2 right-0 text-slate-400', className)} />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-42">
               <DropdownMenuLabel>{'Actions'}</DropdownMenuLabel>
               <DropdownMenuSeparator />
               <DropdownMenuGroup>
                  {possibleActions.map(actionName => (
                     <DropdownMenuItem className='cursor-pointer' key={actionName} onClick={handleAction(actionName)}>
                        <Icon icon={actionConfig[actionName]?.icon} width={18} className='mr-2' />
                        {actionName}
                     </DropdownMenuItem>
                  ))}
               </DropdownMenuGroup>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   );
};

export default CardActionsDropdown;
