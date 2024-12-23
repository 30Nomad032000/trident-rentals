import type { Metadata } from 'next';
import './globals.css';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import ZSiqChat from '@/components/custom/ZSiqChat';

export const metadata: Metadata = {
  title: 'Trident Rentals',
};

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Toaster position="top-right" />
        {children}
        <ZSiqChat />
      </body>
    </html>
  );
}
