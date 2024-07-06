"use client"
import { useQuery } from '@tanstack/react-query';
import { getFoldersByParentId } from '@/services/folderApi';

function useFetchFoldersByParentId(parentId) {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['folders',parentId],
      queryFn: async () => {
         try {
            const { message, status, data } = await getFoldersByParentId(parentId);
            return data;
         } catch (error) {
            throw error;
         }
      },

   })

   return { data , isLoading, isError, refetch };
}

export default useFetchFoldersByParentId;
