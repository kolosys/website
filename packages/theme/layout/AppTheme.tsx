'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "../components";
import { Icon, IconName } from "../components/Icon";
import type { NavPlugin } from "./AppNav";

export const NavThemeTogglePlugin: NavPlugin = {
    name: "ThemeToggle",
    component: <AppThemeToggle key="theme-toggle" />
}

export function AppThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, resolvedTheme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const cycleTheme = () => {
        if (theme === 'system') setTheme('light');
        else if (theme === 'light') setTheme('dark');
        else setTheme('system');
    };

    const getIcon = (): IconName => {
        if (theme === 'system') return 'palette';
        return resolvedTheme === 'light' ? 'sun' : 'moon';
    };

    const getNextTheme = () => {
        if (theme === 'system') return 'light';
        if (theme === 'light') return 'dark';
        return 'system';
    };

    return (
        <Button
            variant="ghost"
            size="xs"
            onClick={cycleTheme}
            aria-label={`Current theme: ${theme}. Click to switch to ${getNextTheme()}`}
        >
            <Icon name={getIcon()} size="sm" />
        </Button>
    );
}