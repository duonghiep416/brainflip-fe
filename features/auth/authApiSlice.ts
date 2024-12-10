// src/features/auth/authApiSlice.ts
import { endpoints } from '@/configs/endpoints';
import { SERVER_URL } from '@/configs/site.config';
import {
  ConfirmResetPasswordApiResponse,
  ConfirmResetPasswordCredentials,
  LoginApiResponse,
  LoginCredentials,
  LogoutCredentials,
  RegisterApiResponse,
  RegisterCredentials,
  RequestResetPasswordApiResponse,
  RequestResetPasswordCredentials,
} from '@/features/auth/types';
import { getTokenFromCookie } from '@/utils/token';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL, // Thay thế bằng URL API của bạn
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromCookie();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: credentials => ({
        url: endpoints.login,
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<RegisterApiResponse, RegisterCredentials>({
      query: userInfo => ({
        url: endpoints.register,
        method: 'POST',
        body: userInfo,
      }),
    }),

    requestResetPassword: builder.mutation<
      RequestResetPasswordApiResponse,
      RequestResetPasswordCredentials
    >({
      query: credentials => ({
        url: endpoints.requestResetPassword,
        method: 'POST',
        body: credentials,
      }),
    }),

    confirmResetPassword: builder.mutation<
      ConfirmResetPasswordApiResponse,
      ConfirmResetPasswordCredentials & { resetToken: string }
    >({
      query: ({ resetToken, ...credentials }) => {
        const searchParams = new URLSearchParams({ reset_token: resetToken });

        return {
          url: `${endpoints.confirmResetPassword}?${searchParams.toString()}`,
          method: 'POST',
          body: credentials,
        };
      },
    }),

    logout: builder.mutation<void, LogoutCredentials>({
      query: credentials => {
        return {
          url: endpoints.logout,
          method: 'POST',
          body: credentials,
        };
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRequestResetPasswordMutation,
  useConfirmResetPasswordMutation,
  useLogoutMutation,
} = authApiSlice;
