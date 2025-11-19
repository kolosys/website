import type { Metadata } from 'next';
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import './globals.css';


export const metadata: Metadata = {
  metadataBase: new URL('https://www.kolosys.com'),
  title: {
    default: "Kolosys HUB",
    template: "%s | Kolosys",
  },
  description: "Admin dashboard for Kolosys organization",
  keywords: [],
  authors: [{ name: "Kolosys" }],
  creator: "Kolosys",
  publisher: "Kolosys",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hub.kolosys.com',
    title: 'Kolosys HUB',
    description: 'Building enterprise-grade Go libraries for high-performance applications. Open-source tools for concurrency, scheduling, data structures, and more.',
    siteName: 'Kolosys',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Kolosys Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolosys HUB',
    description: 'Building enterprise-grade Go libraries for high-performance applications.',
    images: ['/icon.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

