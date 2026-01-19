"use client";

import { useState } from "react";
import type { LibraryData } from "@kolosys-sites/hub-client";
import Link from "next/link";
import { Icon, Button } from "@kolosys-sites/theme";
import {
  getLibraryTagline,
  getLibraryUseCases,
  isLibraryNew,
  getInstallCommand,
} from "@/utils/categorizeLibraries";

type Props = {
  library: LibraryData;
};

const codeSnippets: Record<string, string> = {
  ion: `pool := ion.New(...)
res := pool.Get(ctx)
defer res.Close()`,
  photon: `bus := photon.New()
bus.Publish(ctx, evt)
bus.Subscribe(ctx, fn)`,
  neuron: `actor := neuron.New()
actor.Send(ctx, msg)
actor.Receive(ctx)`,
  nova: `timer := nova.New()
timer.After(ctx, dur)
timer.Stop()`,
  axon: `bot := axon.New(token)
bot.OnMessage(handler)
bot.Start(ctx)`,
};

export function LibraryCard({ library }: Props) {
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  const docsUrl = `/docs/${library.name.toLowerCase()}/latest`;
  const githubUrl = `https://github.com/${library.fullName}`;
  const version = library.latestTag || "v0.0.0";
  const tagline = getLibraryTagline(library);
  const useCases = getLibraryUseCases(library);
  const isNew = isLibraryNew(library);
  const codeSnippet = codeSnippets[library.name.toLowerCase()] || "";
  const installCmd = getInstallCommand(library);

  const handleCopyInstall = async () => {
    try {
      await navigator.clipboard.writeText(installCmd);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className="group relative bg-surface rounded-lg border border-border p-6 hover:border-primary-emphasis hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
      onMouseEnter={() => setShowCode(true)}
      onMouseLeave={() => setShowCode(false)}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Icon */}
        {library.emoji ? (
          <div className="shrink-0 w-14 h-14 flex items-center justify-center bg-gradient-to-br from-primary-base to-primary-subtle rounded-lg group-hover:scale-110 transition-transform">
            <Icon emoji={library.emoji} size="lg" />
          </div>
        ) : (
          <div className="shrink-0 w-14 h-14 flex items-center justify-center bg-elevated rounded-lg border border-outline">
            <Icon name="box" pack="basic" size="lg" className="text-caption" />
          </div>
        )}

        {/* Title and Badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary-emphasis transition-colors">
              {library.name}
            </h3>
            {isNew && (
              <span className="px-2 py-0.5 bg-accent-100 text-accent-800 text-xs rounded-full font-medium">
                NEW
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-success-100 text-success-800 text-xs rounded-full font-medium">
              {version}
            </span>
            {library.stargazersCount !== undefined && library.stargazersCount > 0 && (
              <div className="flex items-center gap-1 text-xs text-caption">
                <Icon name="star" pack="basic" size="xs" className="text-yellow-400" />
                <span>{library.stargazersCount.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tagline */}
      <p className="text-sm font-medium text-foreground mb-2">{tagline}</p>

      {/* Description */}
      <p className="text-sm text-caption mb-4 line-clamp-2">{library.description}</p>

      {/* Use Case Tags */}
      {useCases.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {useCases.map((useCase) => (
            <span
              key={useCase}
              className="px-2 py-1 bg-primary-base/10 dark:bg-primary-base/20 text-primary-emphasis text-xs rounded border border-primary-subtle"
            >
              {useCase}
            </span>
          ))}
        </div>
      )}

      {/* Code Preview (on hover) */}
      {codeSnippet && (
        <div
          className={`mb-4 overflow-hidden transition-all duration-300 ${
            showCode ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-elevated rounded-md p-3 border border-outline">
            <div className="text-xs text-caption mb-1">Quick Example</div>
            <pre className="text-xs font-mono text-foreground overflow-x-auto">
              {codeSnippet}
            </pre>
          </div>
        </div>
      )}

      {/* Install Command */}
      <div className="mb-4 p-2 bg-elevated rounded-md border border-outline flex items-center justify-between gap-2">
        <code className="text-xs font-mono text-foreground flex-1 overflow-x-auto">
          {installCmd}
        </code>
        <button
          onClick={handleCopyInstall}
          className="shrink-0 p-1.5 hover:bg-hover rounded transition-colors"
          title="Copy install command"
        >
          {copied ? (
            <Icon name="check" pack="basic" size="xs" className="text-success-600" />
          ) : (
            <Icon name="copy" pack="basic" size="xs" className="text-caption" />
          )}
        </button>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-border">
        <Button
          variant="primary"
          size="sm"
          href={docsUrl}
          className="flex-1"
        >
          View Docs
        </Button>
        <Button
          variant="outline"
          size="sm"
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="code-alt" pack="basic" size="xs" />
        </Button>
      </div>
    </div>
  );
}
