import { loginApi, logoutApi, refreshApi,meApi } from '@/services/authAPi';
import { navigate } from '@/actions/navigate';
import createSelectors from "./selectors";
import { HttpError } from '@/lib/utils';
import { msg } from '@/lib/constants';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import Cookies from "js-cookie";
import delay from 'delay';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    image: string;
}

type Status = 'default' | 'loading' | 'error' | 'success';

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
        isAuthenticated:false
    }))
);

const { setState, getState } = authStore;

export const setUser = (user) => setState({ user })
export const setStatus = (status) => setState({ status })
export const setMessage = (message) => setState({ message })

export const fetchUser = async () => {
    setState({ status: 'loading', message: '' });
    try {
        const { message, status, data } = await meApi();
        
        setState({
            user: data,
            status,
            message,
            isAuthenticated:true
        });
    }
    catch (error) {
        handleError(error);
    }
}

export const login = async (credential) => {
    setState({ status: 'loading', message: '' });
    await delay(1000)
    try {
        const { message, status, data } = await loginApi(credential);
        setState({
            accessToken: data.accessToken,
            accessTokenExpiresAt: data.accessTokenExpiresAt,
            refreshTokenExpiresAt: data.refreshTokenExpiresAt,
            status,
            message,
        });
        await delay(1000)
        navigate('/dashboard');
    } catch (error) {
        handleError(error);
    }
}

export const logout = async () => {
    setState({ status: 'loading', message: '' });
    await delay(2000)
    try {
        await checkUser();
        await isRefreshTokenValid();
        const { message, status } = await logoutApi(getState().user.id);
        setState({
            user: null,
            accessToken: null,
            accessTokenExpiresAt: null,
            refreshTokenExpiresAt: null,
            isAuthenticated:false,
            status,
            message
        });
    } catch (error) {
        handleError(error);
    }
}

export const refreshToken = async () => {
    try {
        await isRefreshTokenValid();
        setState({ status: 'loading', message: '' });
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
        throw(error)
    }
}

export const handleError = async (error: any) => {
    navigate('/login');
    const { message, status } = error?.response?.data || error;
    setState({
        user: null,
        accessToken: null,
        accessTokenExpiresAt: null,
        refreshTokenExpiresAt: null,
        dashboardLoading: false,
        isAuthenticated:false,
        status,
        message
    });
}

export const checkUser = async () => {
    const { user } = authStore.getState();
    if (!user) {
        throw new HttpError(msg.REFRESH_TOKEN_EXPIRED)
    }
}

export const isRefreshTokenValid = async () => {
    const refreshTokenExpiresAt = Cookies.get('refreshTokenExpiresAt');
    const now = Math.floor(new Date().getTime() / 1000);
    if (!refreshTokenExpiresAt || parseInt(refreshTokenExpiresAt) <= now) {
        throw new HttpError(msg.REFRESH_TOKEN_EXPIRED)
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

export const initializeApp = async() => {
    try {
        setState({ dashboardLoading: true });
        await delay(2000)
        await refreshToken();
        await fetchUser();
        setState({ dashboardLoading: false });
        
    } catch (error) {
        navigate('/login')
    }
}


export const getAccessToken=()=> authStore.getState().accessToken

export const useAuthStore = createSelectors(authStore);
