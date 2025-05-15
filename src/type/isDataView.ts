/**
 * Check if the given value is a DataView
 * @param v - Any type value
 * @returns Returns true if the value is a DataView, otherwise returns false
 * @example
 * isDataView(new DataView(new ArrayBuffer(1))) // => ✅ true
 * isDataView([]) // => ❌ false
 */
export function isDataView(v: any): v is DataView {
	return v instanceof DataView && Object.prototype.toString.call(v) === '[object DataView]'
}