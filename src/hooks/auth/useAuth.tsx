import { useQuery } from '@tanstack/react-query';
import { meApi, refreshApi } from '@/services/authAPi';
import { useRouter } from 'next/navigation';
import { queryClient } from '@/providers/QueryClientProvider';
import { setState , getState} from '@/store/authStore';


export function useAuth() {
    const router = useRouter();

    const refreshTokenQuery = useQuery({
        queryKey: ['refreshToken'],
        queryFn: async () => {
            try {
                const { message, status, data } = await refreshApi();
                setState({
                    accessToken: data.accessToken,
                    accessTokenExpiresAt: data.accessTokenExpiresAt,
                    refreshTokenExpiresAt: data.refreshTokenExpiresAt,
                    status,
                    message,
                });
                return data;
            } catch (error) {
                const { message, status } = error?.response?.data || error;
                setState({
                    user: null,
                    accessToken: null,
                    accessTokenExpiresAt: null,
                    refreshTokenExpiresAt: null,
                    dashboardLoading: false,
                    isAuthenticated: false,
                    status,
                    message,
                });
                router.push('/login');
                queryClient.removeQueries();
                throw error;
            }
        },

    });

    const fetchUserQuery = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            try {
                const { message, status, data } = await meApi();
                setState({
                    user: data,
                    status,
                    message,
                    isAuthenticated: true,
                });
                return data;
            } catch (error) {
                router.push('/login');
                queryClient.removeQueries();
                throw error;
            }
        },
        enabled: !!refreshTokenQuery.data?.accessToken ,
    });

    return {
        refreshTokenData: refreshTokenQuery.data,
        isRefreshing: refreshTokenQuery.isLoading,
        isRefreshError: refreshTokenQuery.isError,
        refetchRefreshToken: refreshTokenQuery.refetch,
        userData: fetchUserQuery.data,
        userRole:fetchUserQuery.data?.role,
        userPermissions:fetchUserQuery.data?.permissions,
        isFetchingUser: fetchUserQuery.isLoading,
        isFetchUserError: fetchUserQuery.isError,
        refetchFetchUser: fetchUserQuery.refetch,
    };
}
