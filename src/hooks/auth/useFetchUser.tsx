import { useQuery } from '@tanstack/react-query';
import { meApi } from '@/services/authAPi';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/providers/QueryClientProvider'
import { setState } from '@/store/authStore'; 


export function useFetchUser() {
    const router = useRouter();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const { message, status, data } = await meApi();
                setState({
                    user: data,
                    status,
                    message,
                    isAuthenticated: true
                });
                return data;
            } catch (error) {
                router.push('/login');
                queryClient.removeQueries(); 
                throw error;
            }
        },
    });

    return { data, isLoading, isError, refetch };
}