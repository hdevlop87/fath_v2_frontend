"use client"
import { useQuery } from '@tanstack/react-query';
import { getSetting } from '@/services/settingApi';

function useFetchSettings(enabled = true) {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['settings'],
      queryFn: async () => {
         try {
            const { data } = await getSetting();
            return data;
         } catch (error) {
            throw error;
         }
      },
      enabled
   })

   return { settings: data, isLoading, isError, refetch };
}

export default useFetchSettings;
