'use client'

import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

const Loading = () => {
  
  return (
    <div className='absolute top-0 bg-white flex h-full w-full justify-center items-center z-50'>
      <MagnifyingGlass
        visible={true}
        height="140"
        width="140"
        ariaLabel="MagnifyingGlass-loading"
        wrapperStyle={{}}
        wrapperClass="MagnifyingGlass-wrapper"
        glassColor='#c0efff'
        color='orange'
      />
    </div>
  );
};

export default Loading;
