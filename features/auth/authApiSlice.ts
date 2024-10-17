// src/features/auth/authApiSlice.ts
import { SERVER_URL } from '@/configs/site.config';
import {
  LoginApiResponse,
  LoginCredentials,
  RegisterApiResponse,
  RegisterCredentials,
} from '@/features/auth/types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL, // Thay thế bằng URL API của bạn
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token'); // Lấy token từ localStorage
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<LoginApiResponse, LoginCredentials>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    register: builder.mutation<RegisterApiResponse, RegisterCredentials>({
      query: userInfo => ({
        url: '/auth/register',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
