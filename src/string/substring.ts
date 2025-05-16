/**
 * Extracts a substring from the string.
 * 
 * @param {string} str - The input string.
 * @param {number} start - The starting index.
 * @param {number} end - The ending index.
 * @returns {string} The extracted substring.
 * 
 * @example
 * substring('hello world', 0, 5); // 'hello'
 */
export function substring(str: string, start: number, end: number): string {
  return str.substring(start, end);
}
