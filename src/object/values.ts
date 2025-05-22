import { isFunction, isPrimitive } from "../type";

/**
 * Retrieves the values of an object's own properties, filtered by an optional predicate.
 *
 * Supports both string and symbol keys. By default, only enumerable properties are included.
 * A custom predicate can be provided to control which values are returned based on the key
 * and property descriptor.
 *
 * If the input is a primitive (non-object), an empty array is returned.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object whose values are to be retrieved.
 * @param {(key?: string | symbol, descriptor?: PropertyDescriptor) => boolean} [predicate] -
 *        Optional predicate function to filter properties. Receives the key and descriptor.
 *        If omitted, only enumerable values are returned.
 * @returns {T[keyof T][]} An array of the object's own property values, filtered by the predicate.
 *
 * @example
 * const obj = {
 *   a: 1,
 *   b: 2,
 *   get c() { return 3; }
 * };
 * Object.defineProperty(obj, 'd', {
 *   value: 4,
 *   enumerable: false
 * });
 * const sym = Symbol('e');
 * obj[sym] = 5;
 *
 * // Get only enumerable values (default)
 * values(obj); // [1, 2, 3, 5]
 *
 * // Get all values, including non-enumerable
 * values(obj, () => true); // [1, 2, 3, 4, 5]
 *
 * // Get only non-enumerable values
 * values(obj, (key, desc) => !desc.enumerable); // [4]
 *
 * // Get only symbol values
 * values(obj, (key) => typeof key === 'symbol'); // [5]
 */
export function values<T extends object>(
  obj: T,
  predicate?: (key?: string | symbol, descriptor?: PropertyDescriptor) => boolean
): T[keyof T][] {
  if (isPrimitive(obj)) return [] as T[keyof T][];
  const keyList =
    typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function'
      ? Reflect.ownKeys(obj)
      : [
          ...(Object.getOwnPropertyNames ? Object.getOwnPropertyNames(obj) : []),
          ...(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(obj) : []),
        ];

  return keyList
    .filter((key) => {
      const desc = Object.getOwnPropertyDescriptor(obj, key);
      if (!desc) return false;
      if (isFunction(predicate)) {
        return predicate(key, desc);
      }
      return desc.enumerable;
    })
    .map((key) => obj[key as keyof T]);
}