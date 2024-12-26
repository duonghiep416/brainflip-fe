import { endpoints } from '@/configs/endpoints';
import baseQuery from '@/features/baseQuery';
import { GetFlashcardSetResponse } from '@/features/flashcardSet/types';
import { createApi } from '@reduxjs/toolkit/query/react';

export const flashcardSetApiSlice = createApi({
  reducerPath: 'flashcardSets',
  baseQuery,
  tagTypes: ['FlashcardSets'],

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
      providesTags: ['FlashcardSets'],
    }),

    createFlashcards: builder.mutation({
      query: body => ({
        url: endpoints.createFlashcards,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['FlashcardSets'],
    }),
  }),
});

export const { useGetFlashcardSetQuery, useCreateFlashcardsMutation } =
  flashcardSetApiSlice;
