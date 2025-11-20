import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KniSoci App',
  description: 'Brand Intelligence App',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>KniSoci Header</h1>
          <nav>
            <a href="/dashboard">Dashboard</a>
            <a href="/scan">Scan</a>
            <a href="/history">History</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}