'use client'

import React from 'react';
import Sidebar from '@/components/SideBar';
import Navbar from '@/components/navbar';
import Prompts from '@/components/Prompts/PromptLayout';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/auth/useAuth';
import useFetchSettings from '@/hooks/subdivision/useFetchSettings';

const Layout = ({ children }: { children: React.ReactNode }) => {

  const { userRole } = useAuth();
  const { isLoading: isLoadingSettings } = useFetchSettings();
  if(!userRole) return null

  return (
    <div className='flex w-full h-full bg-[#F1EDED] dark:bg-black'>
      <Sidebar />
      <div className='flex flex-col flex-1 px-2 lg:px-6'>
        <div className='flex h-[56px] w-full'>
          <Navbar />
        </div>
        <Separator className='h-[2px] mb-4' />
        <div className='flex h-full  overflow-auto '>
          {children}
        </div>
      </div>
      <Prompts />
    </div>
  );
}

export default Layout;
