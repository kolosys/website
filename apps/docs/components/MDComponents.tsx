import type { JSX, FunctionComponent } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export function Markdown({ content }: { content: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
            code: CodeBlock,
            pre: PreBlock,
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