import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://docs.kolosys.com'),
  title: {
    default: "Kolosys Documentation",
    template: "%s | Kolosys Docs",
  },
  description: "Comprehensive documentation for Kolosys enterprise-grade Go libraries. Learn how to build high-performance applications with our open-source tools.",
  keywords: [
    "golang documentation",
    "go library docs",
    "kolosys docs",
    "go tutorials",
    "golang guides",
    "go api reference",
    "golang examples",
    "go concurrency guide",
    "golang best practices",
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
    url: process.env.NEXT_PUBLIC_BASE_URL || 'https://docs.kolosys.com',
    title: 'Kolosys Documentation',
    description: 'Comprehensive documentation for Kolosys enterprise-grade Go libraries. Learn how to build high-performance applications with our open-source tools.',
    siteName: 'Kolosys Docs',
    images: [
      {
        url: '/icon.png',
        width: 1200,
        height: 630,
        alt: 'Kolosys Documentation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kolosys Documentation',
    description: 'Comprehensive documentation for Kolosys enterprise-grade Go libraries.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

