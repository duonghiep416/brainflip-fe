import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers/Providers';
import '@/styles/fonts.css';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Brain Flip',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" data-theme="light">
      <body>
        <Toaster richColors position="top-center" />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
