/**
 * Remove whitespace from the right end of a string
 * @param str - Input string
 * @returns Right-trimmed string
 * @example
 * trimEnd('hello  ') // => 'hello' ✅
 * trimEnd(123) // => '123' ✅
 */

export function trimEnd(str: string): string {
  return str.toString().replace(/\s+$/g, '');
}