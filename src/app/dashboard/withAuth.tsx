import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import useFetchDashData from '@/hooks/subdivision/useFetchDashData';
import useFetchLots from '@/hooks/subdivision/useFetchLots';
import useFetchSales from '@/hooks/subdivision/useFetchSales';
import useFetchCustomers from '@/hooks/subdivision/useFetchCustomers';
import useFetchSettings from '@/hooks/subdivision/useFetchSettings';
import { MagnifyingGlass } from 'react-loader-spinner';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const [authStatus, setAuthStatus] = useState({
      isRefreshing: false,
      isFetchingUser: false,
      userRole: null,
    });

    const { isRefreshing, isFetchingUser, userRole } = authStatus;

    useEffect(() => {
      const { isRefreshing, isFetchingUser, userRole } = useAuth();
      setAuthStatus({ isRefreshing, isFetchingUser, userRole });
    }, []);

    const shouldFetchData = !!userRole;

    const { isLoading: isLoadingLots } = useFetchLots(shouldFetchData);
    const { isLoading: isLoadingSales } = useFetchSales(shouldFetchData);
    const { isLoading: isLoadingCustomers } = useFetchCustomers(shouldFetchData);
    const { isLoading: isLoadingSettings } = useFetchSettings(shouldFetchData);
    const { isLoading: isLoadingDash } = useFetchDashData(shouldFetchData);

    const allFetchLoading =
      isRefreshing ||
      isFetchingUser ||
      isLoadingLots ||
      isLoadingSales ||
      isLoadingCustomers ||
      isLoadingSettings ||
      isLoadingDash;

    if (allFetchLoading) {
      return (
        <div className='flex h-full w-full justify-center items-center'>
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
    }

    return <WrappedComponent {...props} userRole={userRole} />;
  };
};

export default withAuth;
