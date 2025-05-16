/**
 * Pads the string from the start to a specified length with a given character.
 * 
 * @param {string} str - The input string.
 * @param {number} length - The target length of the string.
 * @param {string} padChar - The character to pad with.
 * @returns {string} The padded string.
 * 
 * @example
 * padStart('hello', 10, '*'); // '*****hello'
 */
export function padStart(str: string, length: number, padChar: string = ' '): string {
  return str.padStart(length, padChar);
}