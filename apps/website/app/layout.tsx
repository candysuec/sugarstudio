
'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'KniBrand - Strategic Brand & Systems Consultant',
  description: 'Clarify your brand, design high-impact assets, build systems & automations, and scale your execution & results.',
  keywords: ['Brand Clarity', 'Automation Systems', 'UX', 'Digital Presence', 'Consulting', 'StoryBrand'],
  openGraph: {
    title: 'KniBrand - Strategic Brand & Systems Consultant',
    description: 'Clarify your brand, design high-impact assets, build systems & automations, and scale your execution & results.',
    url: 'https://knibrand.com',
    siteName: 'KniBrand',
    images: [
      {
        url: 'https://knibrand.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'KniBrand',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KniBrand - Strategic Brand & Systems Consultant',
    description: 'Clarify your brand, design high-impact assets, build systems & automations, and scale your execution & results.',
    creator: '@knibrand',
    images: ['https://knibrand.com/twitter-image.jpg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-brand-black text-silver`}>
        <Header />
        <main className="relative z-10 min-h-screen pt-20"> {/* pt-20 to account for fixed header */}
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
