/**
 * Case Converter Utility Functions
 * Converts text between different case formats
 */

// Split text into words - handles various separators
function splitWords(text: string): string[] {
  return text
    // Handle camelCase and PascalCase
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    // Handle snake_case and CONSTANT_CASE
    .replace(/_/g, ' ')
    // Handle kebab-case
    .replace(/-/g, ' ')
    // Handle dot.case
    .replace(/\./g, ' ')
    // Handle path/case
    .replace(/\//g, ' ')
    // Handle multiple spaces
    .replace(/\s+/g, ' ')
    // Split by space
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word.toLowerCase());
}

// ─────────────────────────────────────
// CASE CONVERSION FUNCTIONS
// ─────────────────────────────────────

export function toUpperCase(text: string): string {
  return text.toUpperCase();
}

export function toLowerCase(text: string): string {
  return text.toLowerCase();
}

export function toTitleCase(text: string): string {
  const words = splitWords(text);
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function toCamelCase(text: string): string {
  const words = splitWords(text);
  if (words.length === 0) return '';
  return (
    words[0] +
    words
      .slice(1)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('')
  );
}

export function toPascalCase(text: string): string {
  const words = splitWords(text);
  return words
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

export function toSnakeCase(text: string): string {
  const words = splitWords(text);
  return words.join('_');
}

export function toKebabCase(text: string): string {
  const words = splitWords(text);
  return words.join('-');
}

export function toDotCase(text: string): string {
  const words = splitWords(text);
  return words.join('.');
}

export function toPathCase(text: string): string {
  const words = splitWords(text);
  return words.join('/');
}

export function toConstantCase(text: string): string {
  const words = splitWords(text);
  return words.join('_').toUpperCase();
}

export function toSentenceCase(text: string): string {
  const words = splitWords(text);
  if (words.length === 0) return '';
  return (
    words[0].charAt(0).toUpperCase() +
    words[0].slice(1) +
    (words.length > 1 ? ' ' + words.slice(1).join(' ') : '')
  );
}

export function toAlternatingCase(text: string): string {
  return text
    .split('')
    .map((char, index) => 
      index % 2 === 0 ? char.toUpperCase() : char.toLowerCase()
    )
    .join('');
}

// SPINAL_CASE (same as kebab-case)
export function toSpinalCase(text: string): string {
  return toKebabCase(text);
}

// Converter mapping
export const caseConverters = {
  uppercase: toUpperCase,
  lowercase: toLowerCase,
  titlecase: toTitleCase,
  camelcase: toCamelCase,
  pascalcase: toPascalCase,
  snakecase: toSnakeCase,
  kebabcase: toKebabCase,
  dotcase: toDotCase,
  pathcase: toPathCase,
  constantcase: toConstantCase,
  sentencecase: toSentenceCase,
  alternating: toAlternatingCase,
  spinalcase: toSpinalCase,
};

export type CaseType = keyof typeof caseConverters;

/**
 * Convert text to all case formats at once
 * Returns an object with all conversions
 */
export function convertToAll(text: string) {
  return {
    uppercase: toUpperCase(text),
    lowercase: toLowerCase(text),
    titlecase: toTitleCase(text),
    camelcase: toCamelCase(text),
    pascalcase: toPascalCase(text),
    snakecase: toSnakeCase(text),
    kebabcase: toKebabCase(text),
    dotcase: toDotCase(text),
    pathcase: toPathCase(text),
    constantcase: toConstantCase(text),
    sentencecase: toSentenceCase(text),
    alternating: toAlternatingCase(text),
  };
}