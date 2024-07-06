"use client"
import { useQuery } from '@tanstack/react-query';
import { getDashData } from '@/services/dashboardApi';

function useFetchdashData(enabled = true) {

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
      enabled
   })

   return { dashData: data, isLoading, isError, refetch };
}

export default useFetchdashData;
