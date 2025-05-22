import { isArray, isDataView, isDate, isFunction, isMap, isObject, isPrimitive, isRegExp, isSet, isTypedArray } from "../type"

/**
 * A customizer function for `cloneWith`, used to transform values before cloning.
 * - If the customizer returns `undefined`, the default clone logic will be used.
 * - If a value is returned, it will be used instead of the default clone.
 */
type Customizer<T> = T extends any[]
  ? (val: T[number], index: number) => T[number] | undefined
  : T extends object
  ? (val: T[keyof T], key: keyof T) => T[keyof T] | undefined
  : never;

/**
 * Internal helper function for both `clone` and `cloneWith`.
 * Handles shallow cloning for various types, and optionally supports custom transformation logic.
 *
 * @param value - The value to clone.
 * @param customizer - Optional function to customize cloned values.
 * @returns A shallow clone of the input value.
 */
function _cloneInternal<T>(value: T, customizer?: Customizer<T>): T {
	if (isPrimitive(value)) {
    return value;
  }

  if (isArray(value)) {
    return value.map((item, index) => {
      if(isFunction(customizer)) {
        const customized = customizer(item, index as any);
        return customized
      }
      return item
    }) as T;
  }

  if (isDate(value)) {
    return new Date(value.getTime()) as T;
  }

  if (isRegExp(value)) {
    return new RegExp(value.source, value.flags) as T;
  }

  if (isMap(value)) {
    return new Map(value) as T;
  }

  if (isSet(value)) {
    return new Set(value) as T;
  }

  if (isTypedArray(value)) {
    return value.slice() as T;
  }

  if (isDataView(value)) {
    return new DataView(value.buffer.slice(0)) as T;
  }

  if (isObject(value)) {
    const prototype = Object.getPrototypeOf(value);
    const result = Object.create(prototype);

    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const item = (value as any)[key];
        const customized = customizer?.(item, key as any);
        result[key] = customized !== undefined ? customized : item;
      }
    }

    return result;
  }

  return value;
}

/**
 * Creates a shallow clone of the given value.
 *
 * Supports a wide range of built-in JavaScript types including:
 * - Primitives (returned as-is)
 * - Arrays
 * - Date objects
 * - RegExp objects
 * - Map and Set
 * - TypedArrays (e.g. Uint8Array, Float32Array, etc.)
 * - DataView
 * - Plain objects (preserving prototype)
 *
 * This function **does not** perform deep cloning.
 *
 * @template T - The type of the value to clone
 * @param {T} value - The value to be cloned
 * @returns {T} - A shallow copy of the original value
 *
 * @example
 * // Clone an array
 * const arr = [1, 2, 3];
 * const clonedArr = clone(arr);
 * console.log(clonedArr); // [1, 2, 3]
 * console.log(clonedArr === arr); // ❌ false
 *
 * @example
 * // Clone an object
 * const obj = { a: 1, b: { c: 2 } };
 * const clonedObj = clone(obj);
 * console.log(clonedObj); // { a: 1, b: { c: 2 } }
 * console.log(clonedObj === obj); // ❌ false
 * console.log(clonedObj.b === obj.b); // ✅ true (shallow clone)
 *
 * @example
 * // Clone a Date
 * const date = new Date();
 * const clonedDate = clone(date);
 * console.log(clonedDate); // Same date as original
 * console.log(clonedDate === date); // ❌ false
 *
 * @example
 * // Clone a Map
 * const map = new Map([['key', 'value']]);
 * const clonedMap = clone(map);
 * console.log(clonedMap.get('key')); // 'value'
 * console.log(clonedMap === map); // ❌ false
 */
export function clone<T>(value: T): T {
	return _cloneInternal(value)
}

/**
 * Performs a shallow clone of `value`, invoking `customizer` to customize the cloned value.
 * If `customizer` returns a defined value, it is used instead of the default clone.
 *
 * @template T
 * @param value - The value to clone.
 * @param customizer - Optional customizer invoked with the value.
 * @returns {T} The cloned value.
 *
 * @example
 * const obj = { a: 1, b: 2 };
 * const result = cloneWith(obj, (val) => typeof val === 'number' ? val + 1 : undefined);
 * // result => { a: 2, b: 3 }
 */
export function cloneWith<T>(value: T, customizer: Customizer<T>): T {
	return _cloneInternal(value, customizer)
}
