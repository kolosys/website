import type { Metadata } from "next";
import "./globals.css";
import { AppFrame } from "@kolosys-sites/theme";

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kolosys.com'),
  title: {
    default: "Kolosys - Enterprise-grade Go Libraries",
    template: "%s | Kolosys",
  },
  description: "Building enterprise-grade Go libraries for high-performance applications. Open-source tools for concurrency, scheduling, data structures, and more.",
  keywords: [
    "golang",
    "go libraries",
    "enterprise go",
    "go concurrency",
    "go scheduling",
    "open source",
    "golang libraries",
    "go programming",
    "backend development",
    "go tools",
  ],
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
    url: 'https://www.kolosys.com',
    title: 'Kolosys - Enterprise-grade Go Libraries',
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
    title: 'Kolosys - Enterprise-grade Go Libraries',
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
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppFrame>
          {children}
        </AppFrame>
      </body>
    </html>
  );
}

