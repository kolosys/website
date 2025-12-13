import type { JSX, FunctionComponent, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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
        return extractText(children.props.children);
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
            code: CodeBlock,
            pre: PreBlock,
            h1: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return <h1 id={id} {...props}>{children}</h1>;
            },
            h2: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return <h2 id={id} {...props}>{children}</h2>;
            },
            h3: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return <h3 id={id} {...props}>{children}</h3>;
            },
            h4: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return <h4 id={id} {...props}>{children}</h4>;
            },
            h5: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return <h5 id={id} {...props}>{children}</h5>;
            },
            h6: ({ children, ...props }) => {
                const text = extractText(children);
                const baseId = generateHeadingId(text);
                const id = makeUniqueId(baseId);
                return <h6 id={id} {...props}>{children}</h6>;
            },
        }}>
            {content}
        </ReactMarkdown>
    )
}

const CodeBlock: FunctionComponent<JSX.IntrinsicElements['code']> = ({ children, className, ...props }) => {
    // Check if this is a fenced code block (has language class) vs inline code
    const match = /language-(\w+)/.exec(className || '');
    const language = match ? match[1] : '';

    // If it's a fenced code block (has language), use SyntaxHighlighter
    if (language) {
        // Extract the code string from children and remove trailing newline
        const codeString = String(children).replace(/\n$/, '');

        return (
            <div className="syntax-highlighter-wrapper">
                <SyntaxHighlighter
                    language={language}
                    style={vscDarkPlus as any}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        padding: 0,
                        // background: 'transparent',
                    }}
                    codeTagProps={{
                        style: {
                            // background: 'transparent',
                        }
                    }}
                >
                    {codeString}
                </SyntaxHighlighter>
            </div>
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
    // If children is a React element (like our SyntaxHighlighter from CodeBlock),
    // return it directly without wrapping in another <pre> tag
    // This prevents nested <pre> tags since SyntaxHighlighter already creates its own structure
    if (
        children &&
        typeof children === 'object' &&
        'type' in children &&
        typeof (children as any).type !== 'string' // Not a native HTML element like 'code'
    ) {
        return <>{children}</>;
    }

    // Otherwise, render normally (for non-code-block pre elements)
    return <pre {...props}>{children}</pre>;
}