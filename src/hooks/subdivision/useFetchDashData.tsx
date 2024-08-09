"use client"
import { useQuery } from '@tanstack/react-query';
import { getDashData } from '@/services/dashboardApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchdashData() {
   const { can } = usePermissions();
   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['dashboard'],
      queryFn: async () => {
         try {
            const { data } = await getDashData();
            return data;
         } catch (error) {
            throw error;
         }
      },
      enabled: can('read_dashData'),
   })

   return { dashData: data, isLoading, isError, refetch };
}

export default useFetchdashData;
