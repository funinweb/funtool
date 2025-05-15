// Define a type alias to combine all TypedArray types, improving code readability and maintainability
export type TypedArrayTypes =
	| Uint8Array
	| Uint8ClampedArray
	| Uint16Array
	| Uint32Array
	| BigUint64Array
	| Int8Array
	| Int16Array
	| Int32Array
	| BigInt64Array
	| Float32Array
	| Float64Array
/**
 * Check if the given value is a TypedArray
 * @param v - Any type value
 * @returns Returns true if the value is a TypedArray, otherwise returns false
 * @example
 * isTypedArray(new Uint8Array()) // => ✅ true
 * isTypedArray([]) // => ❌ false
 */
export function isTypedArray(v: any): v is TypedArrayTypes {
	// Use ArrayBuffer.isView to check if it is an ArrayBuffer view, and exclude the DataView type
	return ArrayBuffer.isView(v) && !(v instanceof DataView)
}