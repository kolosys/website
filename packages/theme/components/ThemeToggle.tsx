'use client';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "./Button";
import { Icon } from "./Icon";

export function ThemeToggle() {
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

    const getLabel = () => {
        if (theme === 'system') return 'System';
        if (theme === 'light') return 'Light';
        return 'Dark';
    };

    const getNextLabel = () => {
        if (theme === 'system') return 'light';
        if (theme === 'light') return 'dark';
        return 'system';
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={cycleTheme}
            className="fixed top-4 right-4 z-50"
            aria-label={`Current theme: ${getLabel()}. Click to switch to ${getNextLabel()}`}
        >
            {resolvedTheme === 'light' ? (
                <Icon name="moon" size="sm" />
            ) : (
                <Icon name="sun" size="sm" />
            )}
            <span className="ml-2">{getLabel()}</span>
        </Button>
    );
}
