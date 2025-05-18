/**
 * Get all keys of an object
 * @param obj - The object to get keys from
 * @returns An array of keys
 * @example
 * const obj = { a: 1, b: 2 };
 * keys(obj); // ✅ ['a', 'b']
 */
export function keys(obj: object): string[] {
  return Object.keys(obj);
}