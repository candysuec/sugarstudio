import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Candyland App',
  description: 'Admin + Business Operations App',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>Candyland Header</h1>
          <nav>
            <a href="/admin">Admin</a>
            <a href="/workflows">Workflows</a>
            <a href="/settings">Settings</a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
