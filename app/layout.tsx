import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Article Portal',
  description: 'Editorial article management system',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
