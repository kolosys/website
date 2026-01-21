type FenceState = {
  inFence: boolean;
  fenceChar: "`" | "~" | "";
  fenceLen: number;
};

function escapeJsxBlockComment(content: string): string {
  // Prevent closing the JSX comment early.
  return content.replace(/\*\//g, "*\\/");
}

function sanitizeNonFencedMdx(source: string): string {
  let out = source;

  if (out.includes("<!--")) {
    out = out.replace(/<!--([\s\S]*?)-->/g, (_match, inner: string) => {
      return `{/*${escapeJsxBlockComment(inner)}*/}`;
    });
  }

  // MDX doesn't accept doctype declarations; strip them.
  if (out.includes("<!DOCTYPE") || out.includes("<!doctype")) {
    out = out.replace(/<!doctype[\s\S]*?>/gi, "");
  }

  // CDATA blocks can appear in some generated docs; unwrap to raw text.
  if (out.includes("<![CDATA[")) {
    out = out.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, (_match, inner: string) => inner);
  }

  return out;
}

function escapeCurlyBracesOutsideMdxExpressions(source: string): string {
  // In MDX, `{...}` is parsed as a JS expression anywhere in text.
  // Our docs content is *markdown*, not MDX/JSX — so stray `{`/`}` (often from Go snippets)
  // must be escaped to prevent Acorn parse errors.
  if (!source.includes("{") && !source.includes("}")) return source;

  let out = source;

  // Protect JSX block comments we generate: {/* ... */}
  const protectedSegments: string[] = [];
  let idx = 0;
  const protect = (segment: string): string => {
    const token = `___KX_MDXX_${idx}___`;
    protectedSegments.push(segment);
    idx++;
    return token;
  };

  out = out.replace(/\{\/\*[\s\S]*?\*\/\}/g, (m) => protect(m));

  // Protect inline code spans: `...`
  // (Docs commonly contain `{`/`}` in inline code examples.)
  out = out.replace(/`[^`\n]*`/g, (m) => protect(m));

  // Escape all remaining braces.
  out = out.replace(/\{/g, "&#123;").replace(/\}/g, "&#125;");

  // Restore protected segments.
  for (let i = 0; i < protectedSegments.length; i++) {
    const token = `___KX_MDXX_${i}___`;
    out = out.split(token).join(protectedSegments[i]);
  }

  return out;
}

function updateFenceState(line: string, state: FenceState): void {
  // Markdown fences must start at beginning of line (optionally indented).
  // We keep this intentionally simple: if the line opens/closes a fence, toggle.
  const trimmed = line.trimStart();
  if (trimmed.length < 3) return;

  const first = trimmed[0];
  if (first !== "`" && first !== "~") return;

  let i = 0;
  while (i < trimmed.length && trimmed[i] === first) i++;
  if (i < 3) return;

  if (!state.inFence) {
    state.inFence = true;
    state.fenceChar = first;
    state.fenceLen = i;
    return;
  }

  // Close only if same fence char and length >= opening.
  if (state.fenceChar === first && i >= state.fenceLen) {
    state.inFence = false;
    state.fenceChar = "";
    state.fenceLen = 0;
  }
}

export function sanitizeMdxSource(source: string): string {
  // Always sanitize, not just when <! patterns are present
  // Avoid mutating content inside fenced code blocks, but still sanitize multi-line
  // constructs (like HTML comments) outside of fences.
  const state: FenceState = { inFence: false, fenceChar: "", fenceLen: 0 };
  let out = "";
  let cursor = 0;
  let segmentStart = 0;

  while (cursor < source.length) {
    const lineEnd = source.indexOf("\n", cursor);
    const end = lineEnd === -1 ? source.length : lineEnd + 1;
    const line = source.slice(cursor, end);

    const wasInFence = state.inFence;
    updateFenceState(line, state);

    // Entering a fence: flush the preceding non-fenced segment, then start verbatim mode.
    if (!wasInFence && state.inFence) {
      const segment = source.slice(segmentStart, cursor);
      out += escapeCurlyBracesOutsideMdxExpressions(sanitizeNonFencedMdx(segment));
      segmentStart = cursor;
    }

    // Exiting a fence: flush the entire fenced block verbatim (including the closing line),
    // then resume sanitizing.
    if (wasInFence && !state.inFence) {
      out += source.slice(segmentStart, end);
      segmentStart = end;
    }

    cursor = end;
  }

  // Flush the remainder (verbatim if we're still in a fence).
  const remainder = source.slice(segmentStart);
  out += state.inFence ? remainder : escapeCurlyBracesOutsideMdxExpressions(sanitizeNonFencedMdx(remainder));
  return out;
}
