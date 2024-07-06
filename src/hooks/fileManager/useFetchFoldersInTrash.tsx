"use client"
import { useQuery } from '@tanstack/react-query';
import { getFoldersInTrash } from '@/services/folderApi';

function useFetchFoldersInTrash() {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['folders'],
      queryFn: async () => {
         try {
            const { message, status, data } = await getFoldersInTrash();
            return data;
         } catch (error) {
            throw error;
         }
      },
      retry: true,
      staleTime: 0

   })

   return { data , isLoading, isError, refetch };
}

export default useFetchFoldersInTrash;
