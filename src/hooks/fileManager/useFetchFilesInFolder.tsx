"use client"
import { useQuery } from '@tanstack/react-query';
import { getFilesByParentId } from '@/services/fileApi';

function useFetchFoldersByParentId(parentId) {

   const { data, isLoading, isError, refetch } = useQuery({
      queryKey: ['files',parentId],
      queryFn: async () => {
         try {
            const { message, status, data } = await getFilesByParentId(parentId);
            return data;
         } catch (error) {
            throw error;
         }
      },

   })

   return { data , isLoading, isError, refetch };
}

export default useFetchFoldersByParentId;
