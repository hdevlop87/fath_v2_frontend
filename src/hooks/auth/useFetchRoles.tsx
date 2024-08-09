"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllRoles } from '@/services/roleApi';

function useFetchRoles() {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['roles'],
      queryFn: async () => {
         try {
            const { message, status, data } = await getAllRoles();
            return data;
         } catch (error) {
            throw error;
         }
      },
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchRoles;
