import { CopyCodeButton } from './CopyCodeButton';

interface CodeBlockWithCopyProps {
  highlightedHtml: string;
  codeString: string;
  language?: string;
}

export function CodeBlockWithCopy({ highlightedHtml, codeString, language }: CodeBlockWithCopyProps) {
  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-neutral-800 bg-[#0d1117] shadow-lg">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-[#161b22] px-4 py-2">
        <span className="text-xs font-medium text-neutral-400 uppercase tracking-wide">
          {language || 'code'}
        </span>
        <CopyCodeButton code={codeString} />
      </div>
      <div
        className="shiki-wrapper overflow-x-auto px-4 py-3 text-[13px] font-mono [&>pre]:m-0! [&>pre]:bg-transparent! [&>pre]:p-0! [&_code]:bg-transparent! [&_*]:whitespace-pre!"
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
    </div>
  );
}
