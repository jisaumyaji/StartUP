import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'EcoLuxe | Eco-Friendly Sanitary Pads, Bamboo Tissues & Medical Gloves',
  description:
    'Certified sustainable personal hygiene & medical supplies. Organic bamboo sanitary pads, unbleached tissue papers, and biodegradable surgical & doctor examination gloves.',
  keywords: [
    'sanitary pads',
    'bamboo tissues',
    'medical gloves',
    'doctor operation gloves',
    'biodegradable nitrile gloves',
    'organic sanitary napkins',
    'eco friendly tissues',
    'sustainable healthcare supplies'
  ],
  authors: [{ name: 'EcoLuxe Healthcare' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-zinc-950 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-950">
        {children}
      </body>
    </html>
  );
}
