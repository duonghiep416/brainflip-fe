import { SERVER_URL } from '@/configs/site.config';
import { getTokenFromCookie } from '@/utils/getToken';
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
    // Chuyển từ mutation sang query cho GET request
    getMe: builder.query({
      query: () => ({
        url: '/users/me',
        method: 'GET', // Sử dụng GET cho việc lấy dữ liệu
      }),
    }),
  }),
});

export const { useGetMeQuery } = userApiSlice;
