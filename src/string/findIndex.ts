/**
 * Finds the first index of a substring in a string.
 * 
 * @param {string} str - The input string.
 * @param {string} substr - The substring to find.
 * @returns {number} The index of the first occurrence of the substring, or -1 if not found.
 * 
 * @example
 * findIndex('hello world', 'world'); // 6
 */
export function findIndex(str: string, substr: string): number {
  return str.indexOf(substr);
}
