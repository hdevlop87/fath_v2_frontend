import { useQuery } from '@tanstack/react-query';
import { parsePath } from '@/services/folderApi';

function useFetchParsedPath(parentPath) {
    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['parsedPath', parentPath],
        queryFn: async () => {
            try {
                const { message, status, data } = await parsePath(parentPath);
                return data;
            } catch (error) {
                throw error;
            }
        },
        enabled: !!parentPath
    });

    return { data, isLoading, isError, refetch };
}

export default useFetchParsedPath;
