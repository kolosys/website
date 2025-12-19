import type { JSX, FunctionComponent, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { Suspense } from "react";
import { HeadingAnchor } from "./HeadingAnchor";
import { CodeBlock } from "@kolosys-sites/theme";

/**
 * Generate a URL-friendly ID from heading text
 */
function generateHeadingId(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

/**
 * Extract text content from React children
 */
function extractText(children: ReactNode): string {
    if (typeof children === 'string') {
        return children;
    }
    if (typeof children === 'number') {
        return String(children);
    }
    if (Array.isArray(children)) {
        return children.map(extractText).join('');
    }
    if (children && typeof children === 'object' && 'props' in children) {
        const element = children as { props: { children?: ReactNode } };
        if (element.props && 'children' in element.props) {
            return extractText(element.props.children);
        }
    }
    return '';
}

export function Markdown({ content }: { content: string }) {
    // Track used IDs to ensure uniqueness
    const usedIds = new Map<string, number>();

    const makeUniqueId = (baseId: string): string => {
        if (!baseId) {
            baseId = 'heading';
        }

        const count = usedIds.get(baseId) || 0;
        usedIds.set(baseId, count + 1);

        if (count === 0) {
            return baseId;
        }
        return `${baseId}-${count}`;
    };

    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            code: MDCodeBlock,
            pre: PreBlock,
            h1: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return (
                    <h1 id={id} className="group relative" {...props}>
                        {children}
                        <HeadingAnchor id={id} />
                    </h1>
                );
            },
            h2: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return (
                    <h2 id={id} className="group relative" {...props}>
                        {children}
                        <HeadingAnchor id={id} />
                    </h2>
                );
            },
            h3: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return (
                    <h3 id={id} className="group relative" {...props}>
                        {children}
                        <HeadingAnchor id={id} />
                    </h3>
                );
            },
            h4: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return (
                    <h4 id={id} className="group relative" {...props}>
                        {children}
                        <HeadingAnchor id={id} />
                    </h4>
                );
            },
            h5: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return (
                    <h5 id={id} className="group relative" {...props}>
                        {children}
                        <HeadingAnchor id={id} />
                    </h5>
                );
            },
            h6: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return (
                    <h6 id={id} className="group relative" {...props}>
                        {children}
                        <HeadingAnchor id={id} />
                    </h6>
                );
            },
            img: ({ src, alt, ...props }) => {
                // Detect badges (shields.io, etc.) by checking the src URL
                const srcString = typeof src === 'string' ? src : '';
                const isBadge = srcString.includes('shields.io') ||
                    srcString.includes('badge') ||
                    alt?.toLowerCase().includes('badge');

                return (
                    <img
                        src={src}
                        alt={alt}
                        {...props}
                        className={isBadge ? 'badge-image inline-block align-middle' : undefined}
                    />
                );
            },
            a: ({ children, href, ...props }) => {
                if (href?.endsWith('.md')) href = href.replace('.md', '');
                return <Link href={href || ''} {...props} className="text-blue-600 hover:text-blue-700 font-medium">{children}</Link>;
            },
            ul: ({ children, ...props }) => {
                return <ul {...props}>{children}</ul>;
            },
            ol: ({ children, ...props }) => {
                return <ol {...props}>{children}</ol>;
            },
            li: ({ children, ...props }) => {
                return <li {...props}>{children}</li>;
            },
        }}>
            {content}
        </ReactMarkdown>
    )
}

const MDCodeBlock: FunctionComponent<JSX.IntrinsicElements['code']> = ({ children, className, ...props }) => {
    // Check if this is a fenced code block (has language class) vs inline code
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    // Extract the code string to check if it's multi-line
    const codeString = String(children).replace(/\n$/, '');
    const isMultiLine = codeString.includes('\n');

    // If it's a fenced code block (has language), use Shiki for syntax highlighting
    if (language) {
        // Wrap in Suspense to handle async Shiki component
        return (
            <Suspense fallback={
                <div className="syntax-highlighter-wrapper">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                        <code className="text-sm font-mono">{codeString}</code>
                    </pre>
                </div>
            }>
                <CodeBlock language={language} codeString={codeString} />
            </Suspense>
        );
    }

    // If it's multi-line without a language, treat it as a code block with "text" language
    // This handles triple backticks without language indicator
    if (isMultiLine) {
        return (
            <Suspense fallback={
                <div className="syntax-highlighter-wrapper">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                        <code className="text-sm font-mono">{codeString}</code>
                    </pre>
                </div>
            }>
                <CodeBlock language="text" codeString={codeString} />
            </Suspense>
        );
    }

    // Otherwise, it's inline code - render normally
    return (
        <code className={className} {...props}>
            {children}
        </code>
    );
}

const PreBlock: FunctionComponent<JSX.IntrinsicElements['pre']> = ({ children, ...props }) => {
    // Check if this is a fenced code block without a language specified
    // ReactMarkdown renders <pre><code> for fenced blocks without language
    // The code element will be passed as a React element
    if (
        children &&
        typeof children === 'object' &&
        'type' in children &&
        (children as any).type === 'code'
    ) {
        const codeElement = children as { props: { children?: ReactNode; className?: string } };
        const hasLanguage = codeElement.props?.className?.includes('language-');

        // If it's a code block without language, default to "text"
        if (!hasLanguage) {
            const codeString = String(codeElement.props?.children || '').replace(/\n$/, '');

            return (
                <Suspense fallback={
                    <div className="syntax-highlighter-wrapper">
                        <pre className="bg-gray-900 text-gray-100 p-4 rounded overflow-x-auto">
                            <code className="text-sm/6 leading-6 font-mono">{codeString}</code>
                        </pre>
                    </div>
                }>
                    <CodeBlock language="text" codeString={codeString} />
                </Suspense>
            );
        }

        // If it has a language, CodeBlock will handle it, so just pass through
        // But CodeBlock returns a Suspense with ShikiCodeBlock, so we don't need the pre wrapper
        return <>{children}</>;
    }

    // If children is a React element (like our SyntaxHighlighter from CodeBlock),
    // return it directly without wrapping in another <pre> tag
    // This prevents nested <pre> tags since SyntaxHighlighter already creates its own structure
    if (
        children &&
        typeof children === 'object' &&
        'type' in children &&
        typeof (children as any).type !== 'string' // Not a native HTML element
    ) {
        return <>{children}</>;
    }

    // Otherwise, render normally (for non-code-block pre elements)
    return <pre {...props}>{children}</pre>;
}