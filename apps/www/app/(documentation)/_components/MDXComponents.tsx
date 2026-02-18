import { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CodeBlock } from '@kolosys-sites/theme';
import { HeadingAnchor } from './HeadingAnchor';
import type { MDXComponents as MDXComponentsType } from 'mdx/types';

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const Component = ({ children, id, ...props }: React.ComponentPropsWithoutRef<`h${typeof level}`> & { id?: string }) => {
    const Tag = `h${level}` as const;
    return (
      <Tag id={id} className="group relative scroll-mt-20 break-words" {...props}>
        {children}
        {id && <HeadingAnchor id={id} />}
      </Tag>
    );
  };
  Component.displayName = `Heading${level}`;
  return Component;
};

export function useMDXComponents(): MDXComponentsType {
  return {
    h1: createHeading(1),
    h2: createHeading(2),
    h3: createHeading(3),
    h4: createHeading(4),
    h5: createHeading(5),
    h6: createHeading(6),
    p: ({ children, ...props }) => {
      return (
        <p className="break-words overflow-wrap-anywhere" {...props}>
          {children}
        </p>
      );
    },
    a: ({ href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>;

      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      const cleanHref = href.replace(/\.md$/, '');

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" className="break-all" {...props}>
            {children}
          </a>
        );
      }

      return (
        <Link href={cleanHref} className="break-all" {...props}>
          {children}
        </Link>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (!src) return null;

      const isBadge = src.includes('shields.io') || src.includes('badge');

      if (isBadge) {
        return <img src={src} alt={alt || ''} className="max-w-full h-auto" {...props} />;
      }

      return (
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={600}
          className="rounded-lg max-w-full h-auto"
          {...props}
        />
      );
    },
    code: ({ children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');
      const hasNewlines = codeString.includes('\n');
      
      // If it has a language class or contains newlines, treat it as a code block
      const isInline = !match && !hasNewlines;

      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 bg-elevated text-primary-emphasis rounded text-sm font-mono break-all" {...props}>
            {children}
          </code>
        );
      }

      // Use the language from className, or default to 'text' for code blocks without language
      const language = match ? match[1] : 'text';

      return (
        <Suspense fallback={<pre className={`${className} overflow-x-auto`}><code>{children}</code></pre>}>
          <CodeBlock language={language} codeString={codeString} />
        </Suspense>
      );
    },
    pre: ({ children, ...props }) => {
      return <div className="overflow-x-auto w-full" {...props}>{children}</div>;
    },
    table: ({ children, ...props }) => {
      return (
        <div className="my-6 w-full rounded-lg overflow-hidden border border-subtle">
          <div className="overflow-x-auto bg-surface">
            <table className="min-w-[600px] w-full divide-y divide-subtle !m-0" {...props}>
              {children}
            </table>
          </div>
        </div>
      );
    },
    thead: ({ children, ...props }) => {
      return (
        <thead className="bg-subtle" {...props}>
          {children}
        </thead>
      );
    },
    tbody: ({ children, ...props }) => {
      return (
        <tbody className="bg-surface divide-y divide-divider" {...props}>
          {children}
        </tbody>
      );
    },
    tr: ({ children, ...props }) => {
      return (
        <tr {...props}>
          {children}
        </tr>
      );
    },
    th: ({ children, ...props }) => {
      return (
        <th className="px-4 py-3 text-left text-xs font-semibold text-caption uppercase tracking-wider border-b border-subtle" {...props}>
          {children}
        </th>
      );
    },
    td: ({ children, ...props }) => {
      return (
        <td className="px-4 py-3 text-sm text-foreground" {...props}>
          {children}
        </td>
      );
    },
    blockquote: ({ children, ...props }) => {
      return (
        <blockquote className="border-l-4 border-primary-emphasis pl-4 py-2 my-4 italic text-caption break-words overflow-hidden" {...props}>
          {children}
        </blockquote>
      );
    },
    ul: ({ children, ...props }) => {
      return (
        <ul className="list-disc list-inside space-y-2 my-4 break-words" {...props}>
          {children}
        </ul>
      );
    },
    ol: ({ children, ...props }) => {
      return (
        <ol className="list-decimal list-inside space-y-2 my-4 break-words" {...props}>
          {children}
        </ol>
      );
    },
    li: ({ children, ...props }) => {
      return (
        <li className="text-body break-words" {...props}>
          {children}
        </li>
      );
    },
  };
}
