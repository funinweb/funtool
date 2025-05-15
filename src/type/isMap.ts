/**
 * Check if the given value is a Map
 * @param v - Any type value
 * @returns Returns true if the value is a Map, otherwise returns false
 * @example
 * isMap(new Map()) // => ✅ true
 * isMap({}) // => ❌ false
 */
export function isMap(v: any): v is Map<any, any> {
  return Object.prototype.toString.call(v) === '[object Map]' && v instanceof Map;
}

/**
 * Check if the given value is a WeakMap
 * @param v - Any type value
 * @returns Returns true if the value is a WeakMap, otherwise returns false
 * @example
 * isWeakMap(new WeakMap()) // => ✅ true
 * isWeakMap(new Map()) // => ❌ false
 */
export function isWeakMap(v: any): v is WeakMap<WeakKey, any> {
  return Object.prototype.toString.call(v) === '[object WeakMap]' && v instanceof WeakMap;
}