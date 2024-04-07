'use client'

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { useSpring, animated } from '@react-spring/web';
import { cva} from "class-variance-authority"
import { usePathname } from 'next/navigation';

type NavigationLinkProps = {
   item: {
      name: string;
      label: string;
      icon: string;
      route: string;
      allowedRoles?: string[];
   };

   isCollapsed:any
};

const NavigationLink: React.FC<NavigationLinkProps> = ({ item,isCollapsed }) => {
   
   const pathname = usePathname();
   const strippedPathname = pathname.replace(/^\/[a-z]{2}(?=\/)|^\/[a-z]{2}$/, '');
   const isActive = strippedPathname === item.route;

   const itemVariants = cva(
      "flex p-2 gap-2 rounded-md items-center text-sm font-medium  hover:bg-accent hover:text-accent-foreground cursor-pointer",
      {
         variants: {
            isActive: {
               true: "bg-primary",
               false: ""
            }
         },
         defaultVariants: {
            isActive: false
         }
      }
   );

   const style = useSpring({
      opacity: isCollapsed ? 0 : 1,
      width: isCollapsed ? '0%' : '100%',
      config: { tension: 210, friction: 20 }
   });


   return (
      <Link href={item.route} passHref>
         <div className={cn(itemVariants({ isActive }))}>
            <Icon icon={item.icon} className="w-6 h-6 flex-shrink-0" />
            <animated.p style={style}>
               {item.label}
            </animated.p>
         </div>
      </Link>
   );
};

export default NavigationLink;


