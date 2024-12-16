import { endpoints } from '@/configs/endpoints';
import { SERVER_URL } from '@/configs/site.config';
import baseQuery from '@/features/baseQuery';
import { GetMeApiResponse } from '@/features/user/types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery,
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
