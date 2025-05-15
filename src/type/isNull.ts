/**
 * Check if the given value is null
 * @param v - Any type value
 * @returns Returns true if the value is null, otherwise returns false
 * @example
 * isNull(null) // => true ✅
 * isNull(undefined) // => false ❌
 */

export function isNull(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Null]';
}

/**
 * Check if the given value is null or undefined
 * @param v - Any type value
 * @returns Returns true if the value is null or undefined, otherwise returns false
 * @example
 * isNil(null) // => ✅ true
 * isNil(undefined) // => ✅ true
 * isNil(0) // => ❌ false
 */
export function isNil(v: any): boolean {
  return v === null || v === undefined;
}