'use client';

import { PropsWithChildren, useState } from "react";
import { Button, Icon, CodeBlock } from "@kolosys-sites/theme";

interface ComponentExampleProps {
    title?: string;
    description?: string;
    code?: string;
    language?: string;
}

export function ComponentExample({
    title,
    description,
    code,
    language = "tsx",
    children
}: PropsWithChildren<ComponentExampleProps>) {
    const [showCode, setShowCode] = useState(false);

    return (
        <div className="mb-8">
            {(title || description) && (
                <div className="mb-4">
                    {title && <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>}
                    {description && <p className="text-sm text-body">{description}</p>}
                </div>
            )}

            <div className="border border-border rounded-lg overflow-hidden">
                <div className="p-6 bg-panel">
                    <div className="flex flex-wrap gap-4">
                        {children}
                    </div>
                </div>

                {code && (
                    <>
                        <div className="border-t border-border">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowCode(!showCode)}
                                className="w-full justify-between rounded-none"
                            >
                                <span className="text-sm">{showCode ? 'Hide' : 'Show'} Code</span>
                                <Icon name={showCode ? 'chevron-up' : 'chevron-down'} size="sm" />
                            </Button>
                        </div>

                        {showCode && (
                            <div className="border-t border-border bg-neutral-950 p-4">
                                <CodeBlock language={language} codeString={code} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
