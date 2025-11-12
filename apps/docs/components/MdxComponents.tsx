import React from 'react';

/**
 * Generate a URL-friendly ID from heading text
 */
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters except words, spaces, and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

/**
 * Custom heading components that automatically generate IDs
 */
const createHeadingComponent = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const HeadingComponent: React.FC<React.PropsWithChildren<{ id?: string }>> = ({ children, id }) => {
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const textContent = typeof children === 'string' ? children : extractText(children);
    const headingId = id || generateId(textContent);

    return React.createElement(Tag, { id: headingId }, children);
  };

  HeadingComponent.displayName = `H${level}`;
  return HeadingComponent;
};

/**
 * Extract text content from React children
 */
function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (React.isValidElement(children) && children.props.children) {
    return extractText(children.props.children);
  }
  return '';
}

export const mdxComponents = {
  h1: createHeadingComponent(1),
  h2: createHeadingComponent(2),
  h3: createHeadingComponent(3),
  h4: createHeadingComponent(4),
  h5: createHeadingComponent(5),
  h6: createHeadingComponent(6),
};

