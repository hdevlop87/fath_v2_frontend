import { loginApi, logoutApi, refreshApi, meApi } from '@/services/authAPi';
import { navigate } from '../../actions/navigate';
import createSelectors from "./selectors";
import { HttpError } from '@/lib/utils';
import { msg } from '@/lib/constants';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookies from "js-cookie";
import delay from 'delay';
import { useLoaderStore } from './loaderStore';

interface AuthState {
    user: User;
    status: Status;
    message: string;
    accessToken: string;
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    userLoading: boolean;
    dashboardLoading: boolean;
    isAuthenticated: boolean;
}

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    permissions: string[];
    image: string;
}

type Status = 'default' | 'error' | 'success';


const authStore = create<AuthState>()(
    devtools(() => ({
        user: null,
        status: null,
        message: '',
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        userLoading: false,
        dashboardLoading: false,
        isAuthenticated: false
    }))
);

const { setState, getState } = authStore;

export const setUser = (user) => setState({ user })
export const setStatus = (status) => setState({ status })
export const setMessage = (message) => setState({ message });

export const setTokens = ({ accessToken, accessTokenExpiresAt, refreshTokenExpiresAt }) => setState({
    accessToken,
    accessTokenExpiresAt,
    refreshTokenExpiresAt,
});

const { setLoading } = useLoaderStore.getState();

//=======================================================================//

export const login = async (credential) => {
    setLoading(true);
    try {
        const { message, status, data } = await loginApi(credential);
        setState({
            accessToken: data.accessToken,
            accessTokenExpiresAt: data.accessTokenExpiresAt,
            refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            status,
            message,
        });
        navigate('/dashboard');
    }
    catch (error) {
        handleError(error);
    }
    finally {
        setLoading(false);
    }
}

export const logout = async () => {
    setLoading(true);
    await delay(1000)
    const { user } = authStore.getState();
    try {
        await checkUser();
        await isRefreshTokenValid();
        const { message, status } = await logoutApi(user.id);

        setState({
            user: null,
            accessToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            isAuthenticated: false,
            status,
            message
        });
        navigate('/login')
    }
    catch (error) {
        handleError(error);
    }
    finally {
        setLoading(false);
    }
}

export const refreshToken = async () => {
    setLoading(true);
    try {
        await isRefreshTokenValid();
        const { message, status, data } = await refreshApi();
        setState({
            accessToken: data.accessToken,
            accessTokenExpiresAt: data.accessTokenExpiresAt,
            refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            status,
            message,
        });
        return data;
    }
    catch (error) {
        handleError(error);
        throw (error)
    }
    finally {
        setLoading(false);
    }
}

//=======================================================================//

export const handleError = async (error: any) => {
    navigate('/login');
    const { message, status } = error?.response?.data || error;
    setState({
        user: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        dashboardLoading: false,
        isAuthenticated: false,
        status,
        message
    });
}

export const checkUser = async () => {
    const { user } = authStore.getState();
    if (!user) {
        navigate('/login')
        throw new HttpError(msg.REFRESH_TOKEN_EXPIRED);
    }
}

export const isRefreshTokenValid = () => {
    const refreshTokenExpiresAt = Cookies.get('refreshTokenExpiresAt');
    const now = Math.floor(new Date().getTime() / 1000);
    if (!refreshTokenExpiresAt || parseInt(refreshTokenExpiresAt) <= now) {
        return false;
    }
    return true;
}

export const isAccessTokenValid = async () => {
    const { accessTokenExpiresAt } = getState();
    const now = new Date().getTime();
    return accessTokenExpiresAt && accessTokenExpiresAt > now;
}

export const clearAllData = async () => {
    setState({
        user: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null
    });
}

export const getAccessToken = () => authStore.getState().accessToken

export const useAuthStore = createSelectors(authStore);
export { setState, getState };