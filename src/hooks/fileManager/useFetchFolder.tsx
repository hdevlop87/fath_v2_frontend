"use client"
import { useQuery } from '@tanstack/react-query';
import { getFolderById } from '@/services/folderApi'; 

function useFetchFolder(folderId) {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['folder', folderId],
        queryFn: async () => {
            try {
                const { message, status, data } = await getFolderById({ id: folderId });
                return data;
            } catch (error) {
                throw error;
            }
        },
        enabled: !!folderId
    });

    return { data, isLoading, isError, refetch };
}

export default useFetchFolder;
