import React, { useEffect } from 'react';
import { setSidebarState, useSideBarStore } from '@/store/sidebarStore';
import BadgeIcon from '@/components/ui/BadgeIcons';
import SearchBar from '@/components/ui/SearchBar';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme-toggle';
import { Icon } from '@iconify/react';
import { useTranslations } from '@/hooks/useTranslations';
import { useAuthStore } from "@/store/authStore";
import { useI18nStore } from '@/store/i18nStore'; // Import the i18n store
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const getLastSegment = (pathname: string) => {
    const segments = pathname.split('/').filter(segment => !/^[0-9a-fA-F-]+$/.test(segment));
    const segment = segments[segments.length - 1] || segments[segments.length - 2];
    return segment.charAt(0).toUpperCase() + segment.slice(1);
};

const Navbar = () => {
    const t = useTranslations();
    const pathname = usePathname();
    const segment = getLastSegment(pathname);
    const isMobile = useSideBarStore.use.isMobile();
    const user = useAuthStore.use.user();
    const { language, setLanguage } = useI18nStore();

    const getMenuItemClass = (lang: string) => lang === language ? 'bg-blue-500 text-white' : '';

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, [setLanguage]);

    return (
        <div className='flex h-[56px] justify-between items-center w-full '>
            {isMobile ?
                <Icon icon="ri:menu-unfold-3-line-2" width={28} height={28} onClick={() => setSidebarState('open')} />
                :
                <h1 className='font-medium text-lg'>{t(`navbar.${segment}`)}</h1>
            }
            <div className='flex items-center gap-3'>
                <div className='hidden md:flex'>
                    <SearchBar />
                </div>
                <div className='flex gap-1 '>
                    <ThemeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <BadgeIcon icon="ic:baseline-g-translate" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>{t("navbar.languageSelection")}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setLanguage('ar')} className={getMenuItemClass('ar')}>
                                <Icon icon="circle-flags:sa" className='w-5 h-5 mr-2' /> {t("navbar.arabic")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage('en')} className={getMenuItemClass('en')}>
                                <Icon icon="circle-flags:gb-eng" className='w-5 h-5 mr-2' /> {t("navbar.english")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage('fr')} className={getMenuItemClass('fr')}>
                                <Icon icon="circle-flags:fr" className='w-5 h-5 mr-2' /> {t("navbar.french")}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setLanguage('es')} className={getMenuItemClass('es')}>
                                <Icon icon="emojione:flag-for-spain" className='w-5 h-5 mr-2' /> {t("navbar.spanish")}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Avatar className='w-10 h-10 relative'>
                    <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/${user?.image}`} alt="avatar" />
                    <AvatarFallback>
                        <Image
                            src={"/noavatar.png"}
                            alt="no avatar"
                            width={40}
                            height={40}
                            className="z-10"
                        />
                    </AvatarFallback>
                </Avatar>
            </div>
        </div>
    );
};

export default Navbar;
