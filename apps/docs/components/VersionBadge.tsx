import React from 'react';

export interface VersionBadgeProps {
  version: string;
  className?: string;
}

export const VersionBadge: React.FC<VersionBadgeProps> = ({ version, className = '' }) => {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 ${className}`}
    >
      {version}
    </span>
  );
};

