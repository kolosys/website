'use client';

import { useEffect, useState } from 'react';
import { CopyCodeButton } from './internal/CopyCodeButton';

export interface CodeBlockClientProps {
  codeString: string;
  language?: string;
  showHeader?: boolean;
}

export function CodeBlockClient({
  codeString,
  language = 'tsx',
  showHeader = true
}: CodeBlockClientProps) {
  const [highlightedHtml, setHighlightedHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function highlight() {
      setIsLoading(true);
      try {
        const { codeToHtml } = await import('shiki');
        const html = await codeToHtml(codeString, {
          lang: language,
          theme: 'github-dark',
        });
        setHighlightedHtml(html);
      } catch (error) {
        console.error('Failed to highlight code:', error);
        setHighlightedHtml(`<pre><code>${codeString}</code></pre>`);
      } finally {
        setIsLoading(false);
      }
    }

    highlight();
  }, [codeString, language]);

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-subtle bg-primary-950 dark:bg-primary-50 shadow-lg">
      {showHeader && (
        <div className="flex items-center justify-between border-b border-subtle bg-neutral-900 dark:bg-neutral-100 px-4 py-2">
          <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
            {language || 'code'}
          </span>
          <CopyCodeButton code={codeString} elevated />
        </div>
      )}
      {isLoading ? (
        <div className="overflow-x-auto px-4 py-3 text-[13px] font-mono">
          <pre className="m-0 bg-transparent p-0">
            <code className="text-neutral-200">{codeString}</code>
          </pre>
        </div>
      ) : (
        <div
          className="shiki-wrapper overflow-x-auto px-4 py-3 text-[13px] font-mono [&>pre]:m-0! [&>pre]:bg-transparent! [&>pre]:p-0! [&_code]:bg-transparent! [&_*]:whitespace-pre!"
          dangerouslySetInnerHTML={{ __html: highlightedHtml }}
        />
      )}
    </div>
  );
}
