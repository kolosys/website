import { getLibraries, getLibrary, getLibraryNavigation } from '@/actions/libraries';
import { notFound, redirect } from 'next/navigation';
import { getStatusFromVersion } from '@/lib/utils/versions';
import remarkGfm from 'remark-gfm';
import type { NavigationData } from '@/lib/hub/types';
import type { NavItem } from '@/lib/nav';
import { Suspense } from 'react';
import ReactMarkdown from 'react-markdown';
import { Markdown } from '@/components/MDComponents';

/**
 * Convert text to Title Case (proper case)
 */
function toTitleCase(text: string): string {
  return text
    .split(/[\s-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * Check if a navigation item has an index page
 * A group has an index if it has children but also has actual content at its path
 * For now, we'll assume groups don't have indexes unless proven otherwise
 * This will be checked at render time by checking page content
 */
function hasIndexPage(nav: NavigationData): boolean {
  // By default, assume groups don't have indexes
  // The actual check will happen at render time by checking page content
  return false;
}

/**
 * Validate and report MDX content issues
 * Returns information about problematic patterns that could cause parsing errors
 */
function validateMdxContent(content: string): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];

  // First, identify all code blocks (both inline `code` and fenced ```code blocks```)
  // This helps us ignore JSX expressions that are inside code blocks
  const codeBlockRanges: Array<{ start: number; end: number }> = [];

  // Find fenced code blocks (```...```)
  const fencedCodeBlockRegex = /```[\s\S]*?```/g;
  let match;
  while ((match = fencedCodeBlockRegex.exec(content)) !== null) {
    codeBlockRanges.push({ start: match.index, end: match.index + match[0].length });
  }

  // Find inline code blocks (`...`)
  // We need to be careful not to match backticks that are inside fenced blocks
  const inlineCodeBlockRegex = /`[^`\n]+`/g;
  while ((match = inlineCodeBlockRegex.exec(content)) !== null) {
    const matchStart = match.index;
    const matchEnd = match.index + match[0].length;
    // Only add if not inside a fenced code block
    const isInsideFenced = codeBlockRanges.some(
      range => matchStart >= range.start && matchEnd <= range.end
    );
    if (!isInsideFenced) {
      codeBlockRanges.push({ start: matchStart, end: matchEnd });
    }
  }

  // Helper function to check if a position is inside a code block
  function isInsideCodeBlock(pos: number): boolean {
    return codeBlockRanges.some(range => pos >= range.start && pos < range.end);
  }

  // Check for unclosed fenced code blocks (``` without closing ```)
  const unclosedFencedRegex = /```[^`]*$/gm;
  while ((match = unclosedFencedRegex.exec(content)) !== null) {
    const lineNum = content.substring(0, match.index).split('\n').length;
    const snippet = match[0].substring(0, 50);
    issues.push(`Line ${lineNum}: Unclosed fenced code block: ${snippet}...`);
  }

  // Check for unclosed inline code blocks (` without closing `)
  // Only check if not already inside a fenced block
  const unclosedInlineRegex = /`[^`\n]*$/gm;
  while ((match = unclosedInlineRegex.exec(content)) !== null) {
    if (!isInsideCodeBlock(match.index)) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      const snippet = match[0].substring(0, 50);
      issues.push(`Line ${lineNum}: Unclosed inline code block: ${snippet}...`);
    }
  }

  // Check for unclosed JSX expressions (only outside code blocks)
  const jsxExpressionRegex = /\{([^}]*)$/gm;
  while ((match = jsxExpressionRegex.exec(content)) !== null) {
    if (!isInsideCodeBlock(match.index!)) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      const snippet = match[1].substring(0, 50);
      issues.push(`Line ${lineNum}: Unclosed JSX expression: {${snippet}...}`);
    }
  }

  // Check for unclosed JSX tags (simplified check, only outside code blocks)
  const jsxTagRegex = /<[^/>]+>[^<]*$/gm;
  while ((match = jsxTagRegex.exec(content)) !== null) {
    if (!isInsideCodeBlock(match.index!)) {
      const lineNum = content.substring(0, match.index).split('\n').length;
      issues.push(`Line ${lineNum}: Possibly unclosed JSX tag: ${match[0].substring(0, 50)}...`);
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Wrap code-like patterns in code blocks
 * Detects patterns like {cb := ...} that should be code blocks but aren't formatted as such
 */
function wrapCodeLikePatterns(content: string): string {
  // Match patterns like {cb := ...} or {result, err := ...} that look like Go code
  // These patterns start with { followed by a variable name and :=
  const codePattern = /\{([a-zA-Z_][a-zA-Z0-9_,\s]*[:=][^}]*)\}/g;

  let result = content;
  let lastIndex = 0;
  const matches: Array<{ start: number; end: number; code: string }> = [];

  let match;
  while ((match = codePattern.exec(content)) !== null) {
    // Check if this is already inside a code block
    const beforeMatch = content.substring(0, match.index);
    const codeBlocksBefore = (beforeMatch.match(/```/g) || []).length;
    const isInsideCodeBlock = codeBlocksBefore % 2 === 1;

    if (!isInsideCodeBlock) {
      matches.push({
        start: match.index,
        end: match.index + match[0].length,
        code: match[1],
      });
    }
  }

  // Replace matches in reverse order to preserve indices
  for (let i = matches.length - 1; i >= 0; i--) {
    const m = matches[i];
    const before = result.substring(0, m.start);
    const after = result.substring(m.end);
    result = before + `\`\`\`go\n${m.code}\n\`\`\`` + after;
  }

  return result;
}

/**
 * Escape MDX special characters (< and {) that appear in markdown content
 * According to MDX docs: < and { must be escaped (\<, \{) if meant as plain text
 * 
 * We need to escape these characters when they appear outside of code blocks,
 * as code blocks are already handled separately by MDX.
 */
function escapeMdxContent(content: string): string {
  if (!content || content.length === 0) {
    return content;
  }

  // Track code block state as we iterate through the content
  let inFencedCodeBlock = false;
  let inInlineCode = false;
  let escaped = '';

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const remaining = content.substring(i);

    // Detect fenced code blocks (```) - must check this first
    if (remaining.startsWith('```')) {
      // Toggle fenced code block state
      inFencedCodeBlock = !inFencedCodeBlock;
      escaped += '```';
      i += 2; // Skip the other two backticks (loop will increment i by 1 more)
      continue;
    }

    // Detect inline code (`) - only if not in a fenced block
    // Need to check that we're not at the start of a fenced block
    if (!inFencedCodeBlock && char === '`' && !remaining.startsWith('``')) {
      inInlineCode = !inInlineCode;
      escaped += char;
      continue;
    }

    // If we're inside a code block (fenced or inline), don't escape anything
    // Just copy the character as-is
    if (inFencedCodeBlock || inInlineCode) {
      escaped += char;
      continue;
    }

    // Outside code blocks, escape < and { when they're meant as plain text
    // Only escape if they don't look like valid JSX/HTML
    if (char === '<') {
      // Check if this looks like the start of a JSX/HTML tag
      // If followed by a letter, /, !, or space, it might be JSX/HTML, so leave it
      const nextChar = content[i + 1];
      if (nextChar && (/[a-zA-Z/!]/.test(nextChar) || nextChar === ' ')) {
        escaped += char;
      } else {
        // Escape it as plain text
        escaped += '\\<';
      }
    } else if (char === '{') {
      // Check if this looks like the start of a JSX expression
      // If followed by a letter, number, $, space, or another {, it might be JSX, so leave it
      const nextChar = content[i + 1];
      if (nextChar && (/[a-zA-Z0-9$ ]/.test(nextChar) || nextChar === '{')) {
        escaped += char;
      } else {
        // Escape it as plain text
        escaped += '\\{';
      }
    } else {
      escaped += char;
    }
  }

  return escaped;
}

/**
 * Normalize content by converting escaped characters to actual characters
 * This handles cases where content might be stored with \n, \t, etc. as literal strings
 * 
 * When content comes through JSON serialization, escaped characters like \n should
 * be automatically converted to actual newlines. However, if content is double-escaped
 * or stored incorrectly, this normalization will fix it.
 */
function normalizeContent(content: string): string {
  if (!content || content.length === 0) {
    return content;
  }

  // Check if content has literal backslash sequences that need normalization
  const hasEscapedChars = /\\[ntr"']/.test(content);

  if (!hasEscapedChars) {
    // Content looks normal, return as-is
    return content;
  }

  // Replace escaped sequences with actual characters
  // Order matters: handle double backslashes last to avoid double-processing
  return content
    .replace(/\\n/g, '\n')      // \n -> actual newline
    .replace(/\\t/g, '\t')      // \t -> actual tab
    .replace(/\\r/g, '\r')      // \r -> actual carriage return
    .replace(/\\"/g, '"')       // \" -> actual quote
    .replace(/\\'/g, "'")       // \' -> actual apostrophe
    .replace(/\\\\/g, '\\');    // \\ -> single backslash (handle last)
}

/**
 * MDX Content wrapper with error handling
 */
async function MdxContent({
  content,
  filePath,
  title
}: {
  content: string;
  filePath?: string;
  title?: string;
}) {
  // Normalize content to handle escaped characters
  const normalizedContent = normalizeContent(content);

  // Wrap code-like patterns in code blocks before escaping
  const wrappedContent = wrapCodeLikePatterns(normalizedContent);

  // Debug: Check for code blocks in original content
  const codeBlockMatches = normalizedContent.match(/```[\s\S]*?```/g);
  console.log('[MDX Debug] Code blocks found:', codeBlockMatches?.length || 0);

  // Check for code-like patterns that might be JSX expressions
  const jsxLikePatterns = normalizedContent.match(/\{[a-zA-Z][^}]*\}/g);
  console.log('[MDX Debug] JSX-like patterns found:', jsxLikePatterns?.length || 0);
  if (jsxLikePatterns && jsxLikePatterns.length > 0) {
    console.log('[MDX Debug] First JSX-like pattern:', jsxLikePatterns[0].substring(0, 200));
  }

  // Check for code blocks with single backticks
  const inlineCodeMatches = normalizedContent.match(/`[^`\n]+`/g);
  console.log('[MDX Debug] Inline code blocks found:', inlineCodeMatches?.length || 0);

  // Escape MDX special characters (< and {) that should be plain text
  // This prevents MDX from trying to parse them as JSX
  const escapedContent = escapeMdxContent(wrappedContent);

  // Debug: Check for code blocks after escaping
  const escapedCodeBlockMatches = escapedContent.match(/```[\s\S]*?```/g);
  console.log('[MDX Debug] Code blocks after escaping:', escapedCodeBlockMatches?.length || 0);
  if (escapedCodeBlockMatches && escapedCodeBlockMatches.length > 0) {
    console.log('[MDX Debug] First escaped code block:', escapedCodeBlockMatches[0].substring(0, 200));
  }

  // Validate content for common MDX syntax issues
  // const validation = validateMdxContent(escapedContent);
  // if (!validation.isValid) {
  //   console.error('[MDX Validation Failed]', {
  //     filePath,
  //     title,
  //     issues: validation.issues,
  //     contentLength: normalizedContent.length,
  //     firstChars: normalizedContent.substring(0, 200),
  //   });
  // }

  try {
    return (
      <Markdown content={content} />
      // <MdxErrorBoundary content={escapedContent} filePath={filePath} title={title} validationIssues={validation.issues}>
      //   <MDXRemote
      //     source={escapedContent}
      //     components={mdxComponents}
      //     options={{
      //       mdxOptions: {
      //         remarkPlugins: [remarkGfm],
      //       },
      //       parseFrontmatter: false,
      //     }}
      //   />
      // </MdxErrorBoundary>
    );
  } catch (error) {
    console.error('Error rendering MDX content:', error);
    return (
      <div className="text-red-600 p-4 border border-red-300 rounded-lg">
        <p className="font-semibold mb-2">Error rendering MDX content</p>
        {filePath && (
          <p className="text-sm mb-2">
            <strong>File:</strong> {filePath}
          </p>
        )}
        {title && (
          <p className="text-sm mb-2">
            <strong>Title:</strong> {title}
          </p>
        )}
        <p className="text-sm mb-4">
          {error instanceof Error ? error.message : 'Unknown error occurred'}
        </p>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-700 mb-2">View Details</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-96">
            {error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}
          </pre>
        </details>
        <details className="mt-4">
          <summary className="cursor-pointer text-blue-700 mb-2">View Raw Content (first 1000 chars)</summary>
          <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-96">
            {content.substring(0, 1000)}
            {content.length > 1000 ? '...' : ''}
          </pre>
        </details>
      </div>
    );
  }
}

/**
 * Convert NavigationData from API to NavItem format
 */
function convertNavigationToNavItem(
  nav: NavigationData,
  repoId: string
): NavItem | null {
  // Skip hidden items that don't have children (they're not needed for structure)
  // But keep hidden items that have children (they're container groups needed for navigation structure)
  const hasChildren = nav.children && nav.children.length > 0;
  if (nav.hidden && !hasChildren) {
    return null;
  }

  const path = `/${repoId}/${nav.slug.join("/")}`;
  const children = nav.children && nav.children.length > 0
    ? nav.children
      .map((child) => convertNavigationToNavItem(child, repoId))
      .filter((child): child is NavItem => child !== null)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
    : undefined;

  return {
    title: nav.title,
    path,
    order: nav.order,
    icon: nav.emoji || nav.faIcon || undefined,
    children,
    // Store whether this group has an index page
    hasIndex: children ? hasIndexPage(nav) : undefined,
  };
}

export async function generateStaticParams() {
  // During static generation, we'll generate a minimal set of params
  // The actual routes will be generated dynamically at request time
  // This avoids fetch() hanging during prerendering
  try {
    const libraries = await getLibraries();
    return libraries.map((library) => ({
      repo: library.baseSlug || library.id,
      slug: ['overview'], // Just generate overview pages statically
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ repo: string; slug: string[] }>;
}) {
  const { repo, slug } = await params;

  const libraries = await getLibraries();
  const libraryConfig = libraries.find((library) => library.baseSlug === repo || library.id === repo);

  if (!libraryConfig) {
    return {};
  }

  const library = await getLibrary(libraryConfig.id, slug);
  if (!library) {
    return {};
  }

  // Find the page in navigation
  function findPageInNav(items: NavigationData[], targetSlug: string[]): NavigationData | null {
    for (const item of items) {
      if (JSON.stringify(item.slug) === JSON.stringify(targetSlug)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = findPageInNav(item.children, targetSlug);
        if (found) return found;
      }
    }
    return null;
  }

  const navItem = findPageInNav(library.navigation, slug);
  const title = navItem ? `${navItem.title} - ${libraryConfig.name}` : `${libraryConfig.name} Documentation`;
  const description = library.page.description || navItem?.title || `${libraryConfig.name} documentation`;
  const url = `https://docs.kolosys.com/${repo}/${slug.join('/')}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'article',
      siteName: 'Kolosys Docs',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

async function DocContent({ repo, slug, libraries }: { repo: string; slug: string[]; libraries: Awaited<ReturnType<typeof getLibraries>> }) {
  // Find the matching library
  const libraryConfig = libraries.find((library) => library.name.toLowerCase() === repo.toLowerCase() || library.baseSlug === repo || library.id === repo);

  if (!libraryConfig) {
    notFound();
  }

  // Get cached navigation first to check structure
  const navigationData = await getLibraryNavigation(libraryConfig.id);
  if (!navigationData) {
    notFound();
  }

  // Find the current page in navigation
  function findPageInNav(items: NavigationData[], targetSlug: string[]): NavigationData | null {
    for (const item of items) {
      if (JSON.stringify(item.slug) === JSON.stringify(targetSlug)) {
        return item;
      }
      if (item.children && item.children.length > 0) {
        const found = findPageInNav(item.children, targetSlug);
        if (found) return found;
      }
    }
    return null;
  }

  // Find the navigation item for the current slug
  const navItem = findPageInNav(navigationData, slug);

  // If navItem doesn't exist, this is not a valid path
  if (!navItem) {
    notFound();
  }

  // Use repo from URL for paths (not baseSlug which might be different)
  const repoPath = repo;

  // If this is a group path (has children), check if it has an index and redirect if needed
  if (navItem.children && navItem.children.length > 0) {
    // Get the actual page data to check if it has content
    const library = await getLibrary(libraryConfig.id, slug);

    // Check if page has meaningful content
    const hasContent = library?.page?.content && library.page.content.trim().length > 50;

    // If no content, redirect to first child
    if (!hasContent) {
      const sortedChildren = [...navItem.children].sort((a, b) => (a.order || 0) - (b.order || 0));
      const firstChild = sortedChildren[0];
      if (firstChild && firstChild.slug && firstChild.slug.length > 0) {
        redirect(`/${repoPath}/${firstChild.slug.join('/')}`);
      }
    }
  }

  // Get library page data for rendering (only page content, navigation is cached)
  const library = await getLibrary(libraryConfig.id, slug);
  if (!library) {
    notFound();
  }

  // Layout handles sidebar and wrapper - just render content
  return (
    <article className="prose prose-gray max-w-none">
      {library.page?.content ? (
        <MdxContent
          content={library.page.content}
          filePath={`${repoPath}/${slug.join('/')}`}
          title={library.page.title || navItem.title}
        />
      ) : (
        <div className="text-gray-500">No content available.</div>
      )}
    </article>
  );
}

async function DocPageContent({ paramsPromise }: { paramsPromise: Promise<{ repo: string; slug: string[] }> }) {
  // Fetch libraries inside Suspense boundary
  const librariesPromise = getLibraries();

  return (
    <Suspense fallback={
      <DocPageFallback librariesPromise={librariesPromise} />
    }>
      <DocPageWithData paramsPromise={paramsPromise} librariesPromise={librariesPromise} />
    </Suspense>
  );
}

async function DocPageFallback({ librariesPromise }: { librariesPromise: Promise<Awaited<ReturnType<typeof getLibraries>>> }) {
  // Fetch libraries for fallback (needed for sidebar) - this is cached
  const libraries = await librariesPromise;

  // Layout handles sidebar and wrapper - just render content
  return (
    <article className="prose prose-gray max-w-none">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    </article>
  );
}

async function DocPageWithData({
  paramsPromise,
  librariesPromise
}: {
  paramsPromise: Promise<{ repo: string; slug: string[] }>;
  librariesPromise: Promise<Awaited<ReturnType<typeof getLibraries>>>;
}) {
  const { repo, slug } = await paramsPromise;
  const libraries = await librariesPromise;
  return <DocContent repo={repo} slug={slug} libraries={libraries} />;
}

export default function DocPage({
  params,
}: {
  params: Promise<{ repo: string; slug: string[] }>;
}) {
  return <DocPageContent paramsPromise={params} />;
}
