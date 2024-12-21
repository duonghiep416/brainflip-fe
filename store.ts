import { authApiSlice } from '@/features/auth/authApiSlice';
import { userApiSlice } from '@/features/user/userApiSlice';
import { flashcardSetApiSlice } from '@/features/flashcardSet/flashcardSetApiSlice';

import { configureStore } from '@reduxjs/toolkit';
import { flashcardApiSlice } from '@/features/flashcard/flashcardApiSlice';

export const store = configureStore({
  reducer: {
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    [userApiSlice.reducerPath]: userApiSlice.reducer,
    [flashcardSetApiSlice.reducerPath]: flashcardSetApiSlice.reducer,
    [flashcardApiSlice.reducerPath]: flashcardApiSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApiSlice.middleware)
      .concat(userApiSlice.middleware)
      .concat(flashcardSetApiSlice.middleware)
      .concat(flashcardApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
