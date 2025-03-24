import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_URL } from '@/configs/site.config';

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_URL,
  // prepareHeaders: headers => {
  //   console.log('headers', headers.getSetCookie());
  //   return headers;
  // },
  credentials:'include'
});

export default baseQuery;
