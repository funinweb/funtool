/**
 * Check if the given value is a regular expression
 * @param v - Any type value
 * @returns Returns true if the value is a regular expression, otherwise returns false
 * @example
 * isRegExp(/abc/) // => ✅ true
 * isRegExp('abc') // => ❌ false
 */

export function isRegExp(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object RegExp]';
}