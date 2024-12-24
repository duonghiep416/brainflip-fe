import { endpoints } from '@/configs/endpoints';
import baseQuery from '@/features/baseQuery';
import { FlashcardResponse } from '@/features/flashcard/types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const flashcardApiSlice = createApi({
  reducerPath: 'flashcard',
  baseQuery,
  tagTypes: ['Flashcards'],
  endpoints: builder => ({
    getFlashcard: builder.query<FlashcardResponse, string>({
      query: id => ({
        url: `${endpoints.getFlashcard}/${id}`,
        method: 'GET',
      }),
      providesTags: ['Flashcards'],
    }),
  }),
});

export const { useGetFlashcardQuery } = flashcardApiSlice;
