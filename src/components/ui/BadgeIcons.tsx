import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button"

interface BadgeIconProps {
  icon: string; 
  number?: number;
  color?: string;
  onClick?: () => void; // Add this line
}

const BadgeIcon: React.FC<BadgeIconProps> = (props:any) => {

  const colorClass = props.color ? `bg-${props.color}-normal` : 'bg-red-normal';

  return (
    <Button variant="ghost" size="icon" onClick={props.onClick}>
      {props.number &&
        <div className={`${colorClass} absolute -top-2 -right-2 text-xs w-4 h-4 rounded-full flex items-center justify-center `}>
          {props.number}
        </div>
      }
      <Icon icon={props.icon} width={24} />
    </Button>
  )
}

export default BadgeIcon;