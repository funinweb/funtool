/**
 * Repeats the string a specified number of times.
 * 
 * @param {string} str - The input string.
 * @param {number} count - The number of times to repeat the string.
 * @returns {string} The repeated string.
 * 
 * @example
 * repeat('hello', 3); // 'hellohellohello'
 */
export function repeat(str: string, count: number): string {
  return str.repeat(count);
}
