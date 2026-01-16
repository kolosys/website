'use client';

import { useEffect, useState } from 'react';

export interface SyntaxHighlightProps {
  code: string;
  language?: string;
  className?: string;
}

export function SyntaxHighlight({ code, language = 'tsx', className = '' }: SyntaxHighlightProps) {
  const [highlighted, setHighlighted] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function highlight() {
      setIsLoading(true);
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(code, {
          lang: language,
          theme: 'github-dark',
        });
        setHighlighted(html);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        setHighlighted(`<pre><code>${code}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }

    highlight();
  }, [code, language]);

  if (isLoading) {
    return (
      <pre className={`overflow-x-auto px-4 py-3 text-[13px] font-mono m-0 ${className}`}>
        <code className="text-neutral-200">{code}</code>
      </pre>
    );
  }

  return (
    <div
      className={`shiki-wrapper overflow-x-auto text-[13px] [&>pre]:m-0! [&>pre]:bg-transparent! [&>pre]:px-4! [&>pre]:py-3! [&_code]:bg-transparent! ${className}`}
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
}
