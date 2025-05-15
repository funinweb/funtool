/**
 * Check if the given value is an ArrayBuffer
 * @param v - Any type value
 * @returns Returns true if the value is an ArrayBuffer, otherwise returns false
 * @example
 * isArrayBuffer(new ArrayBuffer(8)) // => ✅ true
 * isArrayBuffer([]) // => ❌ false
 */
export function isArrayBuffer(v: any): v is ArrayBuffer {
	return Object.prototype.toString.call(v) === "[object ArrayBuffer]"
}