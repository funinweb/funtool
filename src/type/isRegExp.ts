/**
 * Check if the given value is a regular expression
 * @param v - Any type value
 * @returns Returns true if the value is a regular expression, otherwise returns false
 * @example
 * isRegExp(/abc/) // => ✅ true
 * isRegExp('abc') // => ❌ false
 */

export function isRegExp(v: any): v is RegExp {
  return Object.prototype.toString.call(v) === '[object RegExp]';
}