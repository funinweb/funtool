/**
 * Check if the given value is a number
 * @param v - Any type value
 * @returns Returns true if the value is a number, otherwise returns false
 * @example
 * isNumber(123) // => true ✅
 * isNumber('123') // => false ❌
 */

export function isNumber(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object Number]';
}

/**
 * Check if the given value is an integer
 * @param v - Any type value
 * @returns Returns true if the value is an integer, otherwise returns false
 * @example
 * isInt(123) // => true ✅
 * isInt(123.1) // => false ❌
 */
export function isInt(v: any): boolean {
  return isNumber(v) && v % 1 === 0;
}

/**
 * Check if the given value is a bigint
 * @param v - Any type value
 * @returns Returns true if the value is a bigint, otherwise returns false
 * @example
 * isBigInt(123n) // => true ✅
 * isBigInt(123) // => false ❌
 */
export function isBigInt(v: any): boolean {
  return Object.prototype.toString.call(v) === '[object BigInt]';
}

/**
 * Check if the given value is a float
 * @param v - Any type value
 * @returns Returns true if the value is a float, otherwise returns false
 * @example
 * isFloat(123.1) // => true ✅
 * isFloat(123) // => false ❌
 */
export function isFloat(v: any): boolean {
  return isNumber(v) && v % 1 !== 0;
}

/**
 * Check if the given value is NaN
 * @param v - Any type value
 * @returns Returns true if the value is NaN, otherwise returns false
 * @example
 * isNaN(NaN) // => ✅ true
 * isNaN(123) // => ❌ false
 * isNaN('abc') // => ❌ false
 */
export function isNaN(v: any): v is number {
  // Use Number.isNaN for modern browsers
  if (typeof Number.isNaN === 'function') {
    return Number.isNaN(v) && typeof v === 'number';
  }
  // Fallback for older browsers
  return typeof v === 'number' && isNaN(v);
}