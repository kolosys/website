'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useNavigationLoading } from '../context/NavigationLoadingContext';
import { cn } from '../tools';

export function NavigationProgressBar() {
    const { isNavigating, stopNavigation } = useNavigationLoading();
    const pathname = usePathname();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isNavigating) {
            setIsVisible(true);
            setProgress(0);
            
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) {
                        return prev;
                    }
                    const increment = Math.random() * 15;
                    return Math.min(prev + increment, 90);
                });
            }, 200);

            return () => {
                clearInterval(interval);
            };
        } else {
            setProgress(100);
            const timer = setTimeout(() => {
                setIsVisible(false);
                setProgress(0);
            }, 200);
            return () => clearTimeout(timer);
        }
    }, [isNavigating]);

    useEffect(() => {
        stopNavigation();
    }, [pathname, stopNavigation]);

    if (!isVisible && !isNavigating) {
        return null;
    }

    return (
        <div
            className={cn(
                "fixed top-0 left-0 right-0 z-[100] h-1 bg-primary-emphasis transition-opacity duration-200",
                isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{
                transform: `scaleX(${progress / 100})`,
                transformOrigin: 'left',
                transition: isNavigating ? 'transform 0.2s ease-out' : 'transform 0.2s ease-in, opacity 0.2s ease-in',
            }}
        />
    );
}
