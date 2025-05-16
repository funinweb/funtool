/**
 * Splits a string into word segments.
 * This function is purely responsible for splitting the string into words and not for any formatting.
 * 
 * It handles:
 * - camelCase / PascalCase
 * - snake_case / kebab-case / space-separated
 * - digits mixed with text (e.g. 'userID2Token' → ['user', 'ID', '2', 'Token'])
 * 
 * @param {string} str - The input string to be split.
 * @returns {string[]} Array of word segments.
 *
 * @example
 * words('helloWorld'); // ['hello', 'World']
 * words('APIversion'); // ['API', 'version']
 * words('userID2Token'); // ['user', 'ID', '2', 'Token']
 * words('hello_world-test Value') //['hello', 'world', 'test', 'Value']
 */
export function words(str: string): string[] {
  // Split by camelCase, PascalCase, snake_case, kebab-case, digits, and spaces
  return str
    .replace(/[_\-\s]+/g, ' ')  // Normalize delimiters to spaces
    .trim()
    .split(/\s+/)  // Split by spaces
    .flatMap(part =>
      part.match(/[A-Z]{2,}(?=[A-Z][a-z]|[0-9]|$)|[A-Z]?[a-z]+|[A-Z]+|[0-9]+/g) || [] // Match camelCase, PascalCase, etc.
    );
}
