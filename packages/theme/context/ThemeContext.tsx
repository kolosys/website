'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStoredTheme(): Theme {
    if (typeof window === 'undefined') return 'system';
    const stored = localStorage.getItem('theme');
    if (!stored) return 'system';
    return stored as Theme;
}

function resolveTheme(theme: Theme): ResolvedTheme {
    if (theme === 'system') {
        return getSystemTheme();
    }
    return theme;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>(getStoredTheme);
    const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>(() => resolveTheme(getStoredTheme()));

    useEffect(() => {
        const resolved = resolveTheme(theme);
        setResolvedTheme(resolved);
        document.documentElement.setAttribute('data-theme', resolved);
    }, [theme]);

    useEffect(() => {
        if (theme !== 'system') return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            const resolved = e.matches ? 'dark' : 'light';
            setResolvedTheme(resolved);
            document.documentElement.setAttribute('data-theme', resolved);
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => {
            let next: Theme;
            if (prev === 'system') {
                next = 'light';
            } else if (prev === 'light') {
                next = 'dark';
            } else {
                next = 'system';
            }

            if (next === 'system') {
                localStorage.removeItem('theme');
            } else {
                localStorage.setItem('theme', next);
            }

            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
