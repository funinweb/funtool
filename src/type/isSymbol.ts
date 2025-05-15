/**
 * Check if the given value is a Symbol
 * @param v - Any type value
 * @returns Returns true if the value is a Symbol, otherwise returns false
 * @example
 * isSymbol(Symbol()) // => ✅ true
 * isSymbol('symbol') // => ❌ false
 */
export function isSymbol(v: any): v is symbol {
  return typeof v === 'symbol';
}