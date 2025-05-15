/**
 * Check if the given value is a Date object
 * @param v - Any type value
 * @returns Returns true if the value is a Date object, otherwise returns false
 * @example
 * isDate(new Date()) // => ✅ true
 * isDate('2023-01-01') // => ❌ false
 */

export function isDate(v: any): v is Date {
  return Object.prototype.toString.call(v) === '[object Date]';
}