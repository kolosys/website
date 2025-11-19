/**
 * Convert a string to title case
 * @param text - The text to convert
 * @returns The title case text
 */
export function toTitleCase(text: string): string {
  return text
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
