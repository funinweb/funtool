/**
 * Check if the given value is an array
 * @param v - Any type value
 * @returns Returns true if the value is an array, otherwise returns false
 * @example
 * isArray([]) // => ✅ true
 * isArray({}) // => ❌ false
 */
export function isArray<T = any>(v: any): v is T[] {
	// Where Array.isArray is not supported
	if (typeof Array.isArray === "function") {
		return Array.isArray(v)
	}
	return Object.prototype.toString.call(v) === "[object Array]"
}
