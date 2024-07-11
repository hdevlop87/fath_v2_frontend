'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { cn } from '@/lib/utils';
import { useSpring, animated } from '@react-spring/web';
import { cva } from "class-variance-authority";
import { useEffect } from 'react';
import { useNavigationStore } from '@/store/folderNavigationStore';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuthStore } from '@/store/authStore';
import { useSideBarStore } from '@/store/sidebarStore';

type NavigationLinkProps = {
   item: {
      id?: string;
      name: string;
      label: string;
      icon: string;
      route: string;
      allowedRoles?: string[];
      nestedRoutes?: string[];
   };
   isCollapsed: any;
   isActive: boolean;
};

const NavigationLink: React.FC<NavigationLinkProps> = ({ item, isCollapsed, isActive }) => {

   const t = useTranslations();
   const setParentId = useNavigationStore.use.setParentId();
   const setCurrentView = useSideBarStore(state => state.setCurrentView);
   const user = useAuthStore.use.user();
   const isAdmin = user?.role === 'Admin';

   const itemVariants = cva(
      "flex p-2 gap-2 rounded-md items-center text-sm font-medium cursor-pointer",
      {
         variants: {
            isActive: {
               true: "bg-primary active:bg-orange-800 hover:bg-primary",
               false: "hover:bg-slate-800 hover:text-foreground active:bg-orange-800"
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

   useEffect(() => {
      if (isActive) {
         setCurrentView(item.route);
      }
   }, [isActive, item.route, setCurrentView]);

   const handleClick = () => {
      setCurrentView(item.route);
      if (item.id) {
         setParentId(item.id)
      }
   };

   if (item.allowedRoles && !item.allowedRoles.includes('All') && !isAdmin) {
      return null;
  }

   return (
      <Link href={item.route} passHref >
         <div className={cn(itemVariants({ isActive }))} onClick={handleClick}>
            <Icon icon={item.icon} className="w-6 h-6 flex-shrink-0" />
            <animated.p style={style}>
               {t(`sidebar.${item.label}`)}
            </animated.p>
         </div>
      </Link>
   );
};

export default NavigationLink;
