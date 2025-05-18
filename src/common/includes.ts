import { isString } from "../type/isString";
import { isArray } from "../type/isArray";
import { isPlainObject } from "../type/isObject";
import { isMap } from "../type/isMap";
import { isSet } from "../type/isSet";

/**
 * Checks if a value exists in an array starting from a given index.
 *
 * @template T
 * @param {T[]} source - The array to search.
 * @param {T} target - The value to search for.
 * @param {number} [fromIndex=0] - The index to start searching from.
 * @returns {boolean} True if found, otherwise false.
 * @example
 * includes([1, 2, 3], 2); // true
 * includes([1, 2, 3], 2, 2); // false
 */
export function includes<T>(source: T[], target: T, fromIndex?: number): boolean;

/**
 * Checks if a substring exists in a string starting from a given index.
 *
 * @param {string} source - The string to search.
 * @param {string} target - The substring to search for.
 * @param {number} [fromIndex=0] - The index to start searching from.
 * @returns {boolean} True if found, otherwise false.
 * @example
 * includes('hello world', 'world'); // true
 * includes('hello world', 'world', 8); // false
 */
export function includes(source: string, target: string, fromIndex?: number): boolean;

/**
 * Checks if a value exists among the values of an object.
 *
 * @param {Record<string, any>} source - The object to search.
 * @param {*} target - The value to search for.
 * @returns {boolean} True if found, otherwise false.
 * @example
 * includes({ a: 1, b: 2 }, 2); // true
 */
export function includes(source: Record<string, any>, target: any): boolean;

/**
 * Checks if a key exists in a Map.
 *
 * @template K, V
 * @param {Map<K, V>} source - The Map to search.
 * @param {K} target - The key to search for.
 * @returns {boolean} True if found, otherwise false.
 * @example
 * includes(new Map([['a', 1], ['b', 2]]), 'b'); // true
 */
export function includes<K, V>(source: Map<K, V>, target: K): boolean;

/**
 * Checks if a value exists in a Set.
 *
 * @template T
 * @param {Set<T>} source - The Set to search.
 * @param {T} target - The value to search for.
 * @returns {boolean} True if found, otherwise false.
 * @example
 * includes(new Set([1, 2, 3]), 2); // true
 */
export function includes<T>(source: Set<T>, target: T): boolean;

/**
 * Generic implementation of includes that handles arrays, strings,
 * objects, maps, and sets.
 *
 * @param {*} source - The source to search.
 * @param {*} target - The value to search for.
 * @param {number} [fromIndex=0] - The index to start searching from (arrays/strings only).
 * @returns {boolean} True if found, otherwise false.
 */
export function includes(source: any, target: any, fromIndex: number = 0): boolean {
  if (isArray(source)) {
    return source.slice(fromIndex).includes(target);
  }

  if (isString(source)) {
    return source.indexOf(String(target), fromIndex) !== -1;
  }

  if (isMap(source) || isSet(source)) {
    return source.has(target);
  }

  if (isPlainObject(source)) {
    return Object.values(source).includes(target);
  }

  return false;
}
