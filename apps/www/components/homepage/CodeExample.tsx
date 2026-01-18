import { SyntaxHighlight } from "@kolosys-sites/theme";

type CodeExampleProps = {
  title: string;
  installation: string;
  usage: string;
};

export function CodeExample({ title, installation, usage }: CodeExampleProps) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-medium text-neutral-600 mb-2">Installation</h4>
        <div className="rounded-lg overflow-hidden border border-border bg-surface">
          <SyntaxHighlight language="bash" code={installation} />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-neutral-600 mb-2">Basic Usage</h4>
        <div className="rounded-lg overflow-hidden border border-border bg-surface">
          <SyntaxHighlight language="go" code={usage} />
        </div>
      </div>
    </div>
  );
}
