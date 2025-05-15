
/**
 * Check if the given value is an object
 * @param v - Any type value
 * @returns Returns true if the value is an object, otherwise returns false
 * @example
 * isObject({}) // => true ✅
 * isObject([]) // => true ✅
 * isObject(() => {}) // => true ✅
 * isObject(null) // => false ❌
 */
export function isObject(v: any): boolean {
  return typeof v === 'function' || (typeof v === 'object' && v !== null);
}
/**
 * Check if the given value is an object like
 * @param v - Any type value
 * @returns Returns true if the value is an object like, otherwise returns false
 * @example
 * isObjectLike({}) // => true ✅
 * isObjectLike([]) // => true ✅
 * isObjectLike(() => {}) // => false ❌
 * isObjectLike(null) // => false ❌
 */
export function isObjectLike(v: any): boolean {
  return v != null && typeof v === 'object';
}

/**
 * Check if the given value is a plain object
 * @param v - Any type value
 * @returns Returns true if the value is a plain object, otherwise returns false
 * @example
 * isPlainObject({}) // => ✅ true
 * isPlainObject(new Date()) // => ❌ false
 */
export function isPlainObject(v: any): boolean {
  if (!isObject(v)) return false;

  const prototype = Object.getPrototypeOf(v);
  return prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null;
}