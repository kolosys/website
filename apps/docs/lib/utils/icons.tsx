'use client';

import { Icon as ThemeIcon } from '@kolosys-sites/theme';

interface IconProps {
  emoji?: string | null;
  faIcon?: string | null;
  className?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  fallback?: string;
}

const emojiSizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
};

/**
 * Renders either an emoji or icon based on what's provided
 * Priority: emoji > faIcon > fallback
 */
export function Icon({ emoji, faIcon, className = '', size = 'md', fallback = '📚' }: IconProps) {
  // Prefer emoji if available
  if (emoji) {
    return <span className={`${emojiSizeClasses[size]} ${className}`}>{emoji}</span>;
  }

  // Fallback to default emoji if no icon
  return <span className={`${emojiSizeClasses[size]} ${className}`}>{fallback}</span>;
}
