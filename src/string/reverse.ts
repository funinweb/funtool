/**
 * Reverses the string.
 * 
 * @param {string} str - The input string.
 * @returns {string} The reversed string.
 * 
 * @example
 * reverse('hello'); // 'olleh'
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}
