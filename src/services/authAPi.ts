import http from './http';

export const register = async (data) => {
    const response = await http.post(`/auth/register`, data);
    return response.data;
};

export const loginApi = async (data) => {
    const response = await http.post(`/auth/login`,data);
    return response.data;
};

export const logoutApi = async (id) => {
    const response = await http.post(`/auth/logout/${id}`)
    return response.data;
};

export const refreshApi = async () => {
    const response = await http.get(`/auth/refreshToken`)
    return response.data;
};

export const meApi = async () => {
    const response = await http.get(`/auth/me`)
    return response.data;
};