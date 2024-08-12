"use client";

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/SideBar';
import { Navbar } from '@/components/navbar';
import Prompts from '@/components/Prompts/PromptLayout';
import { Separator } from '@/components/ui/separator';
import Loading from '@/components/Gloading';
import { useAuth } from '@/hooks/auth/useAuth';
import { useAuthStore } from '@/store/authStore';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isRefreshing, isFetchingUser } = useAuth();
  const user = useAuthStore.use.user();
  
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const minLoadingTime = 3000;
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, minLoadingTime);
    return () => clearTimeout(timer);
  }, []);

  if (isRefreshing || isFetchingUser || !user || showLoader) {
    return <Loading />;
  }

  return (
    <>
      <div className='flex w-full h-full bg-[#F1EDED] dark:bg-black'>
        <Sidebar />
        <div className='flex flex-col flex-1 px-2 lg:px-6'>
          <div className='flex h-[56px] w-full'>
            <Navbar />
          </div>

          <Separator className='h-[2px] mb-4' />

          <div className='flex h-full overflow-auto'>
            {children}
          </div>
        </div>
        <Prompts />
      </div>
    </>
  );
}
