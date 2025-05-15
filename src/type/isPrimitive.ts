/**
 * Check if the given value is a primitive type
 * @param v - Any type value
 * @returns Returns true if the value is a primitive, otherwise returns false
 * @example
 * isPrimitive(123) // => ✅ true
 * isPrimitive({}) // => ❌ false
 */
export function isPrimitive(v: any): boolean {
  return (typeof v !== 'object' && typeof v !== 'function') || v === null || v === undefined;
}