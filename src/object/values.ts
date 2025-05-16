/**
 * Get all values of an object
 * @param obj - The object to get values from
 * @returns An array of values
 * @example
 * const obj = { a: 1, b: 2 };
 * values(obj); // ✅ [1, 2]
 */
export function values(obj: object): any[] {
  return Object.values(obj);
}