import { highlightCode } from '../tools';
import { CodeBlockWithCopy } from './internal/CodeBlockWithCopy';

export type CodeBlockProps = {
    language: string;
    codeString: string;
}

export async function CodeBlock({ language, codeString }: CodeBlockProps) {
    const highlightedHtml = await highlightCode(codeString, language);
    return <CodeBlockWithCopy highlightedHtml={highlightedHtml} codeString={codeString} language={language} />;
}
