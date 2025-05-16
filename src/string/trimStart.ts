/**
 * Remove whitespace from the left end of a string
 * @param str - Input string
 * @returns Left-trimmed string
 * @example
 * trimStart('  hello') // => 'hello' ✅
 * trimStart(123) // => '123' ✅
 */

export function trimStart(str: string): string {
  return str.toString().replace(/^\s+/g, '');
}