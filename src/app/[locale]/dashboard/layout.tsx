'use client'

import React from 'react';
import Sidebar from '@/components/SideBar';
import Navbar from '@/components/navbar';
import useFetchLots from '@/hooks/useFetchLots'
import useFetchSales from '@/hooks/useFetchSales'
import useFetchCustomers from '@/hooks/useFetchCustomers'
import useFetchDashData from '@/hooks/useFetchDashData'
import { MagnifyingGlass } from 'react-loader-spinner'

const Layout = ({ children }: { children: React.ReactNode }) => {

  // const { isLoading: isLoadingLots } = useFetchLots();
  // const { isLoading: isLoadingSales } = useFetchSales();
  // const { isLoading: isLoadingCustomers } = useFetchCustomers();
  // const { isLoading: isLoadingDash } = useFetchDashData();

  // const allFetchLoading = isLoadingDash || isLoadingLots || isLoadingSales || isLoadingCustomers;


  // if (allFetchLoading ) return (
  //   <div className='flex h-full w-full justify-center items-center'>
  //     <MagnifyingGlass
  //       visible={true}
  //       height="140"
  //       width="140"
  
  //       ariaLabel="MagnifyingGlass-loading"
  //       wrapperStyle={{}}
  //       wrapperClass="MagnifyingGlass-wrapper"
  //       glassColor='#c0efff'
  //       color='orange'
  //     />
  //   </div>
  // )

  return (
    <div className='flex w-full h-full'>
      <Sidebar />
      <div className='flex flex-col flex-grow px-3 gap-3 '>
        <div className='flex h-[56px] w-full'>
          <Navbar />
        </div>
        <div className='flex flex-grow mt-3'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
