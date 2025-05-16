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
export function hasOwn(obj: object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key);
}