'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LayoutContextType {
    isSidebarOpen: boolean;
    hasSidebar: boolean;
    toggleSidebar: () => void;
    setSidebarPresence: (present: boolean) => void;
    closeSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function LayoutProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [hasSidebar, setHasSidebar] = useState(false);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen(prev => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setIsSidebarOpen(false);
    }, []);

    const setSidebarPresence = useCallback((present: boolean) => {
        setHasSidebar(present);
    }, []);

    return (
        <LayoutContext.Provider value={{
            isSidebarOpen,
            hasSidebar,
            toggleSidebar,
            setSidebarPresence,
            closeSidebar
        }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    const context = useContext(LayoutContext);
    if (context === undefined) {
        throw new Error('useLayout must be used within a LayoutProvider');
    }
    return context;
}
