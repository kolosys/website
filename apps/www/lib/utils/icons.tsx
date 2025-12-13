'use client';

import { config, library, IconPrefix, IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import all icons in Free Solid, Free Regular, and Brands styles
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Tell Font Awesome to skip adding the CSS automatically since it's already handled by Next.js
config.autoAddCss = false;

// Add all icons to the library
// In client components, this is safe and will only execute once per module load
library.add(fas, far, fab);

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

const iconSizeClasses = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
  xl: 'w-8 h-8',
  '2xl': 'w-10 h-10',
  '3xl': 'w-12 h-12',
  '4xl': 'w-16 h-16',
};

/**
 * Renders either an emoji or FontAwesome icon based on what's provided
 * Priority: emoji > faIcon > fallback
 */
export function Icon({ emoji, faIcon, className = '', size = 'md', fallback = '📦' }: IconProps) {
  // Prefer emoji if available
  if (emoji) {
    return <span className={`${emojiSizeClasses[size]} ${className}`}>{emoji}</span>;
  }

  // Try FontAwesome icon if available
  if (faIcon) {
    // Normalize icon format: convert to array format ["fas", "icon-name"]
    const normalized = faIcon.toLowerCase().trim();
    let prefix: IconPrefix = 'fas';
    let iconName = normalized;

    // Handle legacy format with style suffix (e.g., "fa-check-circle-regular")
    if (normalized.endsWith('-regular')) {
      prefix = 'far';
      iconName = normalized.replace('-regular', '').replace(/^fa-/, '');
    } else if (normalized.includes('-brand')) {
      prefix = 'fab';
      iconName = normalized.replace(/-brand(s)?/, '').replace(/^fa-/, '');
    } else if (normalized.startsWith('fa-solid ')) {
      prefix = 'fas';
      iconName = normalized.replace('fa-solid ', '');
    } else if (normalized.startsWith('fa-regular ')) {
      prefix = 'far';
      iconName = normalized.replace('fa-regular ', '');
    } else if (normalized.startsWith('fa-brands ')) {
      prefix = 'fab';
      iconName = normalized.replace('fa-brands ', '');
    } else {
      // Default to solid if no style prefix specified
      iconName = normalized.replace(/^fa-/, '');
    }

    return (
      <FontAwesomeIcon
        icon={[prefix, iconName as IconName]}
        className={`${iconSizeClasses[size]} ${className}`}
      />
    );
  }

  // Fallback to default emoji
  return <span className={`${emojiSizeClasses[size]} ${className}`}>{fallback}</span>;
}

