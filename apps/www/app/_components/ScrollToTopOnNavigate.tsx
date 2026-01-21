'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useEffect(() => {
    // Ensure the viewport scroll resets on navigation.
    // (App Router can preserve scroll in some nested-layout cases.)
    window.scrollTo({ top: 0, left: 0 });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}

