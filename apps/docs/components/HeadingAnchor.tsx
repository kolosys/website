'use client';

import { useState } from 'react';

interface HeadingAnchorProps {
  id: string;
}

export function HeadingAnchor({ id }: HeadingAnchorProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      // Get the current URL and add the hash anchor
      const url = window.location.href.split('#')[0] + '#' + id;
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={handleCopy}
      className="heading-anchor ml-2 inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-blue-500 no-underline"
      aria-label={copied ? 'Link copied!' : 'Copy link to this heading'}
      title={copied ? 'Link copied!' : 'Copy link to this heading'}
    >
      {copied ? (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      )}
    </a>
  );
}
