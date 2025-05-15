/**
 * Get the type of the given value
 * @param v - Any type value
 * @returns Returns the type of the value as a string
 * @example
 * typeOf(123) // => ✅ 'number'
 * typeOf({}) // => ✅ 'object'
 */
export function typeOf(v: any): string {
  if (v === null) return 'null';
  if (Array.isArray(v)) return 'array';
  return typeof v;
}