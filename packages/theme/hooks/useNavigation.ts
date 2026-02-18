'use client';

import { useRouter as useNextRouter } from 'next/navigation';
import { useNavigationLoading } from '../context/NavigationLoadingContext';
import { useCallback } from 'react';

export function useNavigation() {
    const router = useNextRouter();
    const { startNavigation } = useNavigationLoading();

    const push = useCallback((href: string, options?: { scroll?: boolean }) => {
        startNavigation();
        router.push(href, options);
    }, [router, startNavigation]);

    const replace = useCallback((href: string, options?: { scroll?: boolean }) => {
        startNavigation();
        router.replace(href, options);
    }, [router, startNavigation]);

    return {
        ...router,
        push,
        replace,
    };
}
