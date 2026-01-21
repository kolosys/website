'use client';

import { useEffect } from 'react';
import { Button } from '@kolosys-sites/theme';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Documentation error:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    if (error.cause) {
      console.error('Error cause:', error.cause);
    }
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
      <div className="max-w-md text-center space-y-6">
        <div className="text-6xl">📚</div>
        <h2 className="text-2xl font-bold text-gray-900">
          Something went wrong
        </h2>
        <p className="text-gray-600">
          We encountered an error while loading this documentation page.
        </p>
        {error.message && (
          <p className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg font-mono">
            {error.message}
          </p>
        )}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={reset}
            variant="primary"
            size="md"
          >
            Try again
          </Button>
          <Button
            href="/docs"
            variant="outline"
            size="md"
          >
            Back to docs
          </Button>
        </div>
      </div>
    </div>
  );
}
