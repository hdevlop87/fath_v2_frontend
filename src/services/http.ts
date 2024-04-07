import axios from "axios";
import { useAuthStore, refreshToken } from '@/store/authStore'
import { msg } from '@/lib/constants'


const baseURL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

const http = axios.create({
   baseURL,
   headers: {
      "Content-Type": "application/json",
   },
   withCredentials: true,
});


http.interceptors.request.use((config) => {
   const accessToken = useAuthStore.getState().accessToken;

   if(config.url === '/auth/login' ){

   }

   if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
   }
   return config;
},
   (error) => {
      return Promise.reject(error);
   });

const isRefreshTokenError = (error) =>
   error.response?.data?.message === msg.REFRESH_TOKEN_EXPIRED ||
   error.response?.data?.message === msg.REFRESH_TOKEN_VERIFICATION_FAILED ||
   error.response?.data?.message === msg.REFRESH_TOKEN_MISSING ||
   error.response?.data?.message === msg.REFRESH_TOKEN_INVALID;

const isAccessTokenError = (error) =>
   error.response?.data?.message === msg.ACCESS_TOKEN_EXPIRED ||
   error.response?.data?.message === msg.ACCESS_TOKEN_VERIFICATION_FAILED ||
   error.response?.data?.message === msg.ACCESS_TOKEN_MISSING ||
   error.response?.data?.message === msg.ACCESS_TOKEN_INVALID


http.interceptors.response.use((response) => response, async (error) => {

   const originalRequest = error.config;
   const shouldRetry = isAccessTokenError(error) && !originalRequest._retry;

   if (isRefreshTokenError(error)) {
      return Promise.reject(error);
   }

   if (shouldRetry) {
      originalRequest._retry = true;
      await refreshToken();
      const newAccessToken = useAuthStore.getState().accessToken;
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return http(originalRequest);
   }

   return Promise.reject(error);
});

export default http;
