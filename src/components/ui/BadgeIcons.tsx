import React from 'react';
import { Icon } from '@iconify/react';
import { Button } from "@/components/ui/button"

interface BadgeIconProps {
  icon: string;
  number?: number;
  color?: string;
  onClick?: () => void;
  disabled?: boolean; 
}

const BadgeIcon: React.FC<BadgeIconProps> = (props: any) => {

  const colorClass = props.color ? `bg-${props.color}-normal` : 'bg-red-normal';

  return (
    <Button variant="ghost" size="icon" onClick={props.onClick} disabled={props.disabled} className='active:scale-90'> 
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
