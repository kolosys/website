'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface NavigationLoadingContextType {
    isNavigating: boolean;
    startNavigation: () => void;
    stopNavigation: () => void;
}

const NavigationLoadingContext = createContext<NavigationLoadingContextType | undefined>(undefined);

export function NavigationLoadingProvider({ children }: { children: ReactNode }) {
    const [isNavigating, setIsNavigating] = useState(false);

    const startNavigation = useCallback(() => {
        setIsNavigating(true);
    }, []);

    const stopNavigation = useCallback(() => {
        setIsNavigating(false);
    }, []);

    return (
        <NavigationLoadingContext.Provider value={{
            isNavigating,
            startNavigation,
            stopNavigation
        }}>
            {children}
        </NavigationLoadingContext.Provider>
    );
}

export function useNavigationLoading() {
    const context = useContext(NavigationLoadingContext);
    if (context === undefined) {
        throw new Error('useNavigationLoading must be used within a NavigationLoadingProvider');
    }
    return context;
}
