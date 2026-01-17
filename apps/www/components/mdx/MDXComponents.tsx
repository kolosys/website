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
      <Tag id={id} className="group relative scroll-mt-20" {...props}>
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
    a: ({ href, children, ...props }) => {
      if (!href) return <a {...props}>{children}</a>;

      const isExternal = href.startsWith('http://') || href.startsWith('https://');
      const cleanHref = href.replace(/\.md$/, '');

      if (isExternal) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      }

      return (
        <Link href={cleanHref} {...props}>
          {children}
        </Link>
      );
    },
    img: ({ src, alt, ...props }) => {
      if (!src) return null;

      const isBadge = src.includes('shields.io') || src.includes('badge');

      if (isBadge) {
        return <img src={src} alt={alt || ''} {...props} />;
      }

      return (
        <Image
          src={src}
          alt={alt || ''}
          width={800}
          height={600}
          className="rounded-lg"
          {...props}
        />
      );
    },
    code: ({ children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const isInline = !match;

      if (isInline) {
        return (
          <code className="px-1.5 py-0.5 bg-neutral-100 text-neutral-900 rounded text-sm font-mono" {...props}>
            {children}
          </code>
        );
      }

      const language = match[1];
      const codeString = String(children).replace(/\n$/, '');

      return (
        <Suspense fallback={<pre className={className}><code>{children}</code></pre>}>
          <CodeBlock language={language} codeString={codeString} />
        </Suspense>
      );
    },
    pre: ({ children }) => {
      return <>{children}</>;
    },
    table: ({ children, ...props }) => {
      return (
        <div className="overflow-x-auto my-6">
          <table className="min-w-full divide-y divide-subtle border border-subtle" {...props}>
            {children}
          </table>
        </div>
      );
    },
    thead: ({ children, ...props }) => {
      return (
        <thead className="bg-well" {...props}>
          {children}
        </thead>
      );
    },
    tbody: ({ children, ...props }) => {
      return (
        <tbody className="bg-panel divide-y divide-subtle" {...props}>
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
        <th className="px-4 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider border-b border-subtle" {...props}>
          {children}
        </th>
      );
    },
    td: ({ children, ...props }) => {
      return (
        <td className="px-4 py-3 text-sm text-neutral-900" {...props}>
          {children}
        </td>
      );
    },
    blockquote: ({ children, ...props }) => {
      return (
        <blockquote className="border-l-4 border-primary-500 pl-4 py-2 my-4 italic text-neutral-700" {...props}>
          {children}
        </blockquote>
      );
    },
    ul: ({ children, ...props }) => {
      return (
        <ul className="list-disc list-inside space-y-2 my-4" {...props}>
          {children}
        </ul>
      );
    },
    ol: ({ children, ...props }) => {
      return (
        <ol className="list-decimal list-inside space-y-2 my-4" {...props}>
          {children}
        </ol>
      );
    },
    li: ({ children, ...props }) => {
      return (
        <li className="text-neutral-900" {...props}>
          {children}
        </li>
      );
    },
  };
}
