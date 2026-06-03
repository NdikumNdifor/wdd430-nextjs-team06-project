import '@/app/ui/global.css';
import { playfair } from '@/app/ui/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Handcrafted Haven',
  description:
    'A marketplace for discovering handcrafted goods from independent artisans.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${playfair.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
