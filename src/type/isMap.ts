/**
 * Check if the given value is a Map
 * @param v - Any type value
 * @returns Returns true if the value is a Map, otherwise returns false
 * @example
 * isMap(new Map()) // => ✅ true
 * isMap({}) // => ❌ false
 */
export function isMap<K = any, V = any>(v: any): v is Map<K, V> {
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
export function isWeakMap<T = any>(v: any): v is WeakMap<WeakKey, T> {
  return Object.prototype.toString.call(v) === '[object WeakMap]' && v instanceof WeakMap;
}