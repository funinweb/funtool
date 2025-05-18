/**
 * Convert string to lowercase
 * @param str - Input string
 * @returns Lowercase string
 * @example
 * toLowerCase('HELLO') // => 'hello' ✅
 * toLowerCase(123) // => '123' ✅
 */

export function toLowerCase(str: string): string {
  return str.toString().toLowerCase();
}