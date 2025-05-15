/**
 * Check if the given value is a Promise
 * @param v - Any type value
 * @returns Returns true if the value is a Promise, otherwise returns false
 * @example
 * isPromise(Promise.resolve()) // => ✅ true
 * isPromise({}) // => ❌ false
 */
export function isPromise(v: any): boolean {
  return v && typeof v.then === 'function';
}