import { isFunction, isPrimitive } from "../type";

/**
 * Retrieves the own property keys of an object, filtered by an optional predicate.
 *
 * This function supports both string and symbol keys, and by default only includes
 * enumerable properties. You can provide a custom predicate to filter keys based on
 * their name and property descriptor.
 *
 * If the input is a primitive value (non-object), it returns an empty array.
 *
 * @template T - The type of the input object.
 * @param {T} obj - The object whose keys are to be retrieved.
 * @param {(key?: string | symbol, descriptor?: PropertyDescriptor) => boolean} [predicate] - 
 *        An optional function to filter keys. It receives each key and its descriptor.
 *        If not provided, only enumerable keys are returned.
 * @returns {(keyof T)[]} An array of the object's own keys filtered by the predicate.
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
 * // Get only enumerable keys (default)
 * keys(obj); // ['a', 'b', 'c', Symbol(e)]
 *
 * // Get all keys, including non-enumerable
 * keys(obj, () => true); // ['a', 'b', 'c', 'd', Symbol(e)]
 *
 * // Get only non-enumerable keys
 * keys(obj, (key, desc) => !desc.enumerable); // ['d']
 *
 * // Get only symbol keys
 * keys(obj, (key) => typeof key === 'symbol'); // [Symbol(e)]
 */
export function keys<T extends object>(obj: T, predicate?:(key?: string | symbol, descriptor?: PropertyDescriptor) => boolean): (keyof T)[] {
  if(isPrimitive(obj)) return [] as (keyof T)[];
  const keys = typeof Reflect !== 'undefined' && typeof Reflect.ownKeys === 'function'
    ? Reflect.ownKeys(obj)
    : [...(Object.getOwnPropertyNames ? Object.getOwnPropertyNames(obj) : []), ...(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(obj) : [])];

  return keys.filter((key) => {
    const desc = Object.getOwnPropertyDescriptor(obj, key);
    if (!desc) return false;
    if(isFunction(predicate)) {
      return predicate(key, desc);
    }
    return desc.enumerable; // default: only enumerable keys
  }) as (keyof T)[]
}