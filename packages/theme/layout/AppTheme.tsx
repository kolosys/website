'use client';

import { Button } from "../components";
import { Icon, IconName } from "../components/Icon";
import { useTheme } from "../context/ThemeContext";
import type { NavPlugin } from "./AppNav";

export const NavThemeTogglePlugin: NavPlugin = {
    name: "ThemeToggle",
    component: <AppThemeToggle />
}

export function AppThemeToggle() {
    const { theme, resolvedTheme, toggleTheme } = useTheme();

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
            onClick={toggleTheme}
            aria-label={`Current theme: ${theme}. Click to switch to ${getNextTheme()}`}
        >
            <Icon name={getIcon()} size="sm" />
        </Button>
    );
}