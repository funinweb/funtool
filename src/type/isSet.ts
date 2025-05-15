/**
 * Check if the given value is a Set
 * @param v - Any type value
 * @returns Returns true if the value is a Set, otherwise returns false
 * @example
 * isSet(new Set()) // => true ✅
 * isSet({}) // => false ❌
 */
export function isSet(v: any): v is Set<any> {
  return Object.prototype.toString.call(v) === '[object Set]' && v instanceof Set;
}

/**
 * Check if the given value is a WeakSet
 * @param v - Any type value
 * @returns Returns true if the value is a WeakSet, otherwise returns false
 * @example
 * isWeakSet(new WeakSet()) // => ✅ true
 * isWeakSet(new Set()) // => ❌ false
 */
export function isWeakSet(v: any): v is WeakSet<WeakKey> {
  return Object.prototype.toString.call(v) === '[object WeakSet]' && v instanceof WeakSet;
}