import { useQuery } from '@tanstack/react-query';
import { getDashFolderInfo } from '@/services/dashApi';

function useDashFolderInfo() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['folderInfo'],
        queryFn: async () => {
            try {
                const { message, status, data } = await getDashFolderInfo();
                return data;
            } catch (error) {
                throw error;
            }
        },
        retry: true,
        staleTime: 0
    });

    return { data, isLoading, isError, refetch };
}

export default useDashFolderInfo;
