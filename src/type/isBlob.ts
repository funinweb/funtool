/**
 * Check if the given value is a Blob
 * @param v - Any type value
 * @returns Returns true if the value is a Blob, otherwise returns false
 * @example
 * isBlob(new Blob()) // => ✅ true
 * isBlob({}) // => ❌ false
 */
export function isBlob(v: any): v is Blob {
	return typeof Blob !== 'undefined' && v instanceof Blob
}
