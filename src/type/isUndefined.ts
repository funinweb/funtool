/**
 * Check if the given value is undefined
 * @param v - Any type value
 * @returns Returns true if the value is undefined, otherwise returns false
 * @example
 * isUndefined(undefined) // => ✅ true
 * isUndefined(null) // => ❌ false
 */
export function isUndefined(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Undefined]';
}