"use client"
import { useQuery } from '@tanstack/react-query';
import { getFilesByParentId } from '@/services/fileApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchFoldersByParentId(parentId) {

   const { can } = usePermissions();
   
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
      enabled: can('read_file'),
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchFoldersByParentId;
