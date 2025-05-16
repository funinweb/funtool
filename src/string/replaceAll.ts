/**
 * Replaces all occurrences of a substring with a new string.
 * 
 * @param {string} str - The input string.
 * @param {string} target - The substring to replace.
 * @param {string} replacement - The string to replace with.
 * @returns {string} The modified string with replacements.
 * 
 * @example
 * replaceAll('hello world', 'world', 'everyone'); // 'hello everyone'
 */
export function replaceAll(str: string, target: string, replacement: string): string {
  return str.split(target).join(replacement);
}
