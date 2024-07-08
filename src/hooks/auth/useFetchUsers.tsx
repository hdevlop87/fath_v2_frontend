"use client"
import { useQuery } from '@tanstack/react-query';
import { getAllUsers } from '@/services/userApi';

function useFetchUsers() {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['users'],
      queryFn: async () => {
         try {
            const { message, status, data } = await getAllUsers();
            return data;
         } catch (error) {
            throw error;
         }
      },
      staleTime: 5 * 60 * 1000,
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchUsers;
