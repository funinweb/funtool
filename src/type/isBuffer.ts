/**
 * Check if the given value is a Buffer
 * @param v - Any type value
 * @returns Returns true if the value is a Buffer, otherwise returns false
 * @example
 * isBuffer(Buffer.from('test')) // => ✅ true
 * isBuffer('test') // => ❌ false
 */
export function isBuffer(v: any): boolean {
	// @ts-ignore
	return typeof Buffer !== "undefined" && typeof Buffer.isBuffer === "function" && Buffer.isBuffer(v)
}
