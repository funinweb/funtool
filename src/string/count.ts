/**
 * Counts the number of occurrences of a substring in a string.
 * 
 * @param {string} str - The input string.
 * @param {string} substr - The substring to count.
 * @returns {number} The number of times the substring appears in the string.
 * 
 * @example
 * count('hello world, hello universe', 'hello'); // 2
 */
export function count(str: string, substr: string): number {
  return (str.match(new RegExp(substr, 'g')) || []).length;
}
