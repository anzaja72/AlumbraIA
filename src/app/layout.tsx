import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google'; // Corrected import for Geist font
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import AppLayout from '@/components/layout/app-layout'; // New import

const geistSans = Geist({ // Corrected invocation
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({ // Corrected invocation
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Alumbra AI - Conversation Analysis',
  description: 'AI-powered analysis of conversation text to identify emotional abuse, manipulation, and risk levels.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AppLayout>{children}</AppLayout>
        <Toaster />
      </body>
    </html>
  );
}
