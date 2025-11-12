import React from 'react';

export type Status = 'Stable' | 'Beta' | 'Alpha' | 'Experimental' | 'Release Candidate' | 'Unknown';

export interface StatusBadgeProps {
  status: Status | string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusClasses = (status: string): string => {
    switch (status) {
      case 'Stable':
        return 'bg-green-100 text-green-800';
      case 'Beta':
        return 'bg-blue-100 text-blue-800';
      case 'Alpha':
        return 'bg-yellow-100 text-yellow-800';
      case 'Experimental':
        return 'bg-orange-100 text-orange-800';
      case 'Release Candidate':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusClasses(status)} ${className}`}
    >
      {status}
    </span>
  );
};

