import { isPrimitive } from "../type";

/**
 * Check if an object has a specific property
 * @param obj - The object to check
 * @param key - The key to check
 * @returns True if the object has the property, false otherwise
 * @example
 * const obj = { a: 1, b: 2 };
 * hasOwn(obj, 'a'); // ✅ true
 * hasOwn(obj, 'c'); // ❌ false
 */
export function hasOwn<T extends object>(
  obj: T,
  key: keyof T | (string & {}) | symbol | number
): boolean {
  if(isPrimitive(obj)) return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
}