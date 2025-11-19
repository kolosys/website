import { ReactNode } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { ModalProvider } from '@/contexts/ModalContext';
import { ModalContainer } from '@/components/ui/modal';

interface AuthenticatedLayoutProps {
    children: ReactNode;
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
    return (
        <ModalProvider>
            <div className="flex h-screen overflow-hidden">
                {/* Left Sidebar - Fixed */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Sticky Header */}
                    <Header />

                    {/* Page Container - Scrollable */}
                    <main className="flex-1 overflow-y-auto bg-gray-50">
                        <div className="max-w-7xl mx-auto p-6">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <ModalContainer />
        </ModalProvider>
    );
}

