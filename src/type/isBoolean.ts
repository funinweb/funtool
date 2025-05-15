/**
 * Check if the given value is a boolean
 * @param v - Any type value
 * @returns Returns true if the value is a boolean, otherwise returns false
 * @example
 * isBoolean(true) // => ✅ true
 * isBoolean('true') // => ❌ false
 */

export function isBoolean(v: any): v is boolean {
  return Object.prototype.toString.call(v) === '[object Boolean]';
}