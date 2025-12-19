import { createHighlighter, type Highlighter } from "shiki";

// Cache the highlighter instance for reuse across requests
let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Get or create a cached Shiki highlighter instance
 * This is cached to avoid re-initializing on every request
 */
export async function getShikiHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark"],
      langs: [
        "go",
        "javascript",
        "typescript",
        "tsx",
        "jsx",
        "json",
        "yaml",
        "toml",
        "bash",
        "sh",
        "shell",
        "sql",
        "html",
        "css",
        "markdown",
        "md",
        "diff",
        "dockerfile",
        "rust",
        "python",
        "java",
        "c",
        "cpp",
        "csharp",
        "php",
        "ruby",
        "swift",
        "kotlin",
        "scala",
        "xml",
        "plaintext",
        "text",
      ],
    });
  }
  return highlighterPromise;
}

/**
 * Highlight code using Shiki
 * Returns HTML string with syntax highlighting
 */
export async function highlightCode(
  code: string,
  language: string,
  theme: string = "github-dark"
): Promise<string> {
  const highlighter = await getShikiHighlighter();

  // Normalize language name (shiki uses different names than some markdown parsers)
  const normalizedLang = normalizeLanguage(language);

  let html: string;
  try {
    html = highlighter.codeToHtml(code, {
      lang: normalizedLang,
      theme,
    });
  } catch (error) {
    // If language is not supported, fall back to plain text
    console.error(
      `Shiki: Language "${normalizedLang}" not supported, falling back to plain text:`,
      error
    );
    html = highlighter.codeToHtml(code, {
      lang: "plaintext",
      theme,
    });
  }

  return html;
}

/**
 * Normalize language identifiers to Shiki-compatible names
 */
function normalizeLanguage(lang: string): string {
  const normalized = lang.toLowerCase().trim();

  // Map common aliases to Shiki language names
  const languageMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    py: "python",
    rb: "ruby",
    sh: "bash",
    shell: "bash",
    zsh: "bash",
    yml: "yaml",
    md: "markdown",
    txt: "plaintext",
    text: "plaintext",
  };

  return languageMap[normalized] || normalized;
}
