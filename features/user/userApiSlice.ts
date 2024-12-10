import { endpoints } from '@/configs/endpoints';
import { SERVER_URL } from '@/configs/site.config';
import { GetMeApiResponse } from '@/features/user/types';
import { getTokenFromCookie } from '@/utils/token';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: SERVER_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getTokenFromCookie();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    getMe: builder.query<GetMeApiResponse, void>({
      query: () => ({
        url: endpoints.me,
        method: 'GET', // Sử dụng GET cho việc lấy dữ liệu
      }),
    }),
  }),
});

export const { useGetMeQuery } = userApiSlice;
