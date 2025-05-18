/**
 * Convert string to uppercase
 * @param str - Input string
 * @returns Uppercase string
 * @example
 * toUpperCase('hello') // => 'HELLO' ✅
 * toUpperCase(123) // => '123' ✅
 */

export function toUpperCase(str: string): string {
  return str.toString().toUpperCase();
}