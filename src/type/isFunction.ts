/**
 * Check if the given value is a function
 * @param v - Any type value
 * @returns Returns true if the value is a function, otherwise returns false
 * @example
 * isFunction(() => {}) // => ✅ true
 * isFunction({}) // => ❌ false
 */
export function isFunction(v: any): boolean {
  return typeof v === 'function';
}