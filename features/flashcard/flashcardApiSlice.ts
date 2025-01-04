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

    addFlashcards: builder.mutation<
      void,
      { id: string; body: Record<string, any> }
    >({
      query: ({ id, body }) => ({
        url: `${endpoints.addFlashcards}/${id}/flashcards`,
        method: 'POST',
        body,
      }),
    }),

    removeFlashcards: builder.mutation<
      void,
      {
        id: string;
        body: {
          ids: string[];
        };
      }
    >({
      query: ({ id, body }) => ({
        url: `${endpoints.addFlashcards}/${id}/flashcards`,
        method: 'DELETE',
        body,
      }),
    }),

    updateFlashcards: builder.mutation<
      void,
      { id: string; body: Record<string, any> }
    >({
      query: ({ id, body }) => ({
        url: `${endpoints.addFlashcards}/${id}/flashcards`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Flashcards'],
    }),
  }),
});

export const {
  useGetFlashcardQuery,
  useAddFlashcardsMutation,
  useRemoveFlashcardsMutation,
  useUpdateFlashcardsMutation,
} = flashcardApiSlice;
