import React from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import { useLoaderStore } from '@/store/loaderStore';

const Loading = () => {
  const isLoading = useLoaderStore.use.isLoading();

  if (!isLoading) return null;

  return (
    <div className='flex h-full w-full justify-center items-center z-50'>
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
