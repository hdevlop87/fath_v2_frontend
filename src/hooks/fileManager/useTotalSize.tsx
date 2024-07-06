import { useQuery } from '@tanstack/react-query';
import { getTotalFileSize } from '@/services/dashApi';

function useTotalFileSize() {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['totalSize'],
        queryFn: async () => {
            try {
                const { message, status, data } = await getTotalFileSize();
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

export default useTotalFileSize;
