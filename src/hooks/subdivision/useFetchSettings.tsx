"use client"
import { useQuery } from '@tanstack/react-query';
import { getSetting } from '@/services/settingApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchSettings() {
   const { can } = usePermissions();
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
      enabled: can('read_settings'),
   })

   return { settings: data, isLoading, isError, refetch };
}

export default useFetchSettings;
