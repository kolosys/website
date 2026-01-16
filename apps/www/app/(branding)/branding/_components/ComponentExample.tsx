'use client';

import { PropsWithChildren, useState } from "react";
import { Button, Icon, CodeBlockClient } from "@kolosys-sites/theme";
import { cn } from "@kolosys-sites/theme";

interface ComponentExampleProps {
    title?: string;
    description?: string;
    code?: string;
    language?: string;
    depressed?: boolean;
}

export function ComponentExample({
    title,
    description,
    code,
    language = "tsx",
    children,
    depressed = false
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

            <div className={cn("border border-strong rounded-lg", depressed ? "bg-page" : "bg-muted/15")}>
                <div className={cn("p-6")}>
                    <div className="flex flex-wrap gap-4">
                        {children}
                    </div>
                </div>

                {code && (
                    <>
                        <div className="border-t border-strong">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setShowCode(!showCode)}
                                className="w-full justify-between rounded-none hover:rounded-b-lg"
                            >
                                <span className="text-sm">{showCode ? 'Hide' : 'Show'} Code</span>
                                <Icon name={showCode ? 'chevron-up' : 'chevron-down'} size="sm" />
                            </Button>
                        </div>

                        {showCode && (
                            <div className="border-t border-strong p-4 pt-0 bg-page/70 rounded-b-lg">
                                <CodeBlockClient codeString={code} language={language} showHeader={true} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
