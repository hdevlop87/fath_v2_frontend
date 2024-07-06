import { useQuery } from '@tanstack/react-query';
import { getRecentFiles } from '@/services/dashApi';

function useRecentFiles() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['files'],
        queryFn: async () => {
            try {
                const { message, status, data } = await getRecentFiles();
                return data;
            } catch (error) {
                throw error;
            }
        },
        enabled: true,
        retry: true,
        staleTime: 0
    });

    return { data, isLoading, isError, refetch };
}

export default useRecentFiles;
