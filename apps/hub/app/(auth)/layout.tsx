import type { Metadata } from 'next';
import { ClerkProvider, SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import '../globals.css';

export const metadata: Metadata = {
    title: 'Kolosys Hub',
    description: 'Admin dashboard for Kolosys organization',
};

export default function PublicLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {children}
        </div>
    );
}

