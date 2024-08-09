"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllPermissions } from '@/services/permissionApi';

function useFetchPermissions() {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['permissions'],
      queryFn: async () => {
         try {
            const { message, status, data } = await getAllPermissions();
            return data;
         } catch (error) {
            throw error;
         }
      },
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchPermissions;
