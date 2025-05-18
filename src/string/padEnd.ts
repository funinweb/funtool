/**
 * Pads the string from the end to a specified length with a given character.
 * 
 * @param {string} str - The input string.
 * @param {number} length - The target length of the string.
 * @param {string} padChar - The character to pad with.
 * @returns {string} The padded string.
 * 
 * @example
 * padEnd('hello', 10, '*'); // 'hello*****'
 */
export function padEnd(str: string, length: number, padChar: string = ' '): string {
  return str.padEnd(length, padChar);
}