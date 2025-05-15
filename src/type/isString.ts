/**
 * Check if the given value is a string
 * @param v - Any type value
 * @returns Returns true if the value is a string, otherwise returns false
 * @example
 * isString('hello') // => ✅ true
 * isString(123) // => ❌ false
 */

export function isString(v: any): v is string {
  return Object.prototype.toString.call(v) === '[object String]';
}