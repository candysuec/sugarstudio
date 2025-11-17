import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { createClient } from '../lib/supabase/server'; // Import server-side Supabase client
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const inter = Inter({ subsets: ['latin'] });

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined; // Fallback for local development

export const metadata: Metadata = {
  metadataBase: BASE_URL,
  title: 'KniBrand Ecosystem - Public Website',
  description: 'The public front-door to the KniBrand ecosystem: CandyHub, KniSoci, Candyland, and Orchestrator.',
  keywords: ['KniBrand', 'CandyHub', 'KniSoci', 'Candyland', 'Orchestrator', 'AI', 'Branding', 'Automation'],
  openGraph: {
    title: 'KniBrand Ecosystem',
    description: 'The public front-door to the KniBrand ecosystem.',
    url: 'https://www.knibrand.com', // Replace with actual domain
    siteName: 'KniBrand',
    images: [
      {
        url: 'https://www.knibrand.com/og-image.jpg', // Replace with actual OG image
        width: 1200,
        height: 630,
        alt: 'KniBrand Ecosystem',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KniBrand Ecosystem',
    description: 'The public front-door to the KniBrand ecosystem.',
    creator: '@knibrand', // Replace with actual Twitter handle
    images: ['https://www.knibrand.com/twitter-image.jpg'], // Replace with actual Twitter image
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* Header and Footer are now part of page.tsx for better client-side interactivity */}
        {children}
      </body>
    </html>
  );
}
