'use client';

import { store } from '@/store';
import { NextUIProvider } from '@nextui-org/react';
import { Provider } from 'react-redux';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Provider store={store}>{children}</Provider>
    </NextUIProvider>
  );
}
