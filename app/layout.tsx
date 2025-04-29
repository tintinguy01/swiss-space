import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from './components/ui/ThemeProvider';
import { ToastProvider } from '../components/ui/toast';

export const metadata: Metadata = {
  title: 'swiss-space',
  description: 'Portfolio of Swiss Tangsatjatham - Full-Stack Developer & Aerospace Engineer',
  icons: {
    icon: [
      {
        url: '/images/logo.png',
        sizes: '32x32',
        type: 'image/png'
      },
      {
        url: '/images/logo.png',
        sizes: '64x64',
        type: 'image/png'
      },
      {
        url: '/images/logo.png',
        sizes: '192x192',
        type: 'image/png'
      },
      {
        url: '/images/logo.png',
        sizes: '512x512',
        type: 'image/png'
      }
    ],
    apple: {
      url: '/images/logo.png',
      sizes: '180x180',
      type: 'image/png'
    }
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
