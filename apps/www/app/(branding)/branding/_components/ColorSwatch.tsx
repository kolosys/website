'use client';

import { useState } from "react";
import { Icon } from "@kolosys-sites/theme";

interface ColorSwatchProps {
    name: string;
    value: string;
    cssVar?: string;
    tailwindClass?: string;
}

export function ColorSwatch({ name, value, cssVar, tailwindClass }: ColorSwatchProps) {
    const [copied, setCopied] = useState<string | null>(null);

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="border border-border rounded-lg overflow-hidden bg-panel">
            <div
                className={`h-20 ${tailwindClass || ''}`}
                style={tailwindClass ? undefined : { backgroundColor: value }}
            />

            <div className="p-3 space-y-2">
                <div className="font-semibold text-sm text-foreground">{name}</div>

                {cssVar && (
                    <button
                        onClick={() => copyToClipboard(cssVar, 'css')}
                        className="w-full text-left px-2 py-1 text-xs font-mono bg-well hover:bg-muted rounded border border-outline transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-body truncate">{cssVar}</span>
                            {copied === 'css' ? (
                                <Icon name="check" size="xs" className="text-success-600 flex-shrink-0" />
                            ) : (
                                <Icon name="copy" size="xs" className="text-caption flex-shrink-0" />
                            )}
                        </div>
                    </button>
                )}

                {tailwindClass && (
                    <button
                        onClick={() => copyToClipboard(tailwindClass, 'tailwind')}
                        className="w-full text-left px-2 py-1 text-xs font-mono bg-well hover:bg-muted rounded border border-outline transition-colors"
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-body truncate">{tailwindClass}</span>
                            {copied === 'tailwind' ? (
                                <Icon name="check" size="xs" className="text-success-600 flex-shrink-0" />
                            ) : (
                                <Icon name="copy" size="xs" className="text-caption flex-shrink-0" />
                            )}
                        </div>
                    </button>
                )}

                {value && (
                    <div className="text-xs font-mono text-caption truncate">{value}</div>
                )}
            </div>
        </div>
    );
}
