'use client';

import Link from 'next/link';
import { useNavigationLoading } from '../context/NavigationLoadingContext';
import { ComponentProps } from 'react';

type NavigationLinkProps = ComponentProps<typeof Link>;

export function NavigationLink({ onClick, href, ...props }: NavigationLinkProps) {
    const { startNavigation } = useNavigationLoading();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (href) {
            const hrefString = typeof href === 'string' ? href : href.pathname || '';
            if (hrefString && !hrefString.startsWith('#') && !hrefString.startsWith('mailto:') && !hrefString.startsWith('tel:')) {
                startNavigation();
            }
        }
        onClick?.(e);
    };

    return <Link href={href} {...props} onClick={handleClick} />;
}
