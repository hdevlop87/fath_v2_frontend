"use client"
import { useQuery } from '@tanstack/react-query';
import { getFoldersByParentId } from '@/services/folderApi';
import { usePermissions } from '../auth/usePermissions';

function useFetchFoldersByParentId(parentId) {

   const { can } = usePermissions();
   
   
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
      enabled: can('read_folder'),
   })

   return { data , isLoading, isError, refetch };
}

export default useFetchFoldersByParentId;
