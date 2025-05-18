/**
 * Remove whitespace from both ends of a string
 * @param str - Input string
 * @returns Trimmed string
 * @example
 * trim('  hello  ') // => 'hello' ✅
 * trim(123) // => '123' ✅
 */

export function trim(str: string): string {
  return str.toString().replace(/^\s+|\s+$/g, '');
}