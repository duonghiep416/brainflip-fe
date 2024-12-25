import { endpoints } from '@/configs/endpoints';
import baseQuery from '@/features/baseQuery';
import { GetFlashcardSetResponse } from '@/features/flashcardSet/types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const flashcardSetApiSlice = createApi({
  reducerPath: 'flashcardSets',
  baseQuery,
  endpoints: builder => ({
    getFlashcardSet: builder.query<
      GetFlashcardSetResponse,
      {
        flashcardSetId?: string;
      }
    >({
      query: ({ flashcardSetId }) => {
        const url = flashcardSetId
          ? `${endpoints.getFlashcardSet}/${flashcardSetId}`
          : endpoints.getFlashcardSet;
        return {
          url,
          method: 'GET',
        };
      },
    }),
  }),
});

export const { useGetFlashcardSetQuery } = flashcardSetApiSlice;
