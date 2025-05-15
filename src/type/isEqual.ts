import { isArray } from "./isArray";
import { isArrayBuffer } from "./isArrayBuffer";
import { isBoolean } from "./isBoolean";
import { isDataView } from "./isDataView";
import { isDate } from "./isDate";
import { isMap } from "./isMap";
import { isBigInt, isNaN, isNumber } from "./isNumber";
import { isPlainObject } from "./isObject";
import { isRegExp } from "./isRegExp";
import { isSet } from "./isSet";
import { isSymbol } from "./isSymbol";
import { isTypedArray } from "./isTypedArray";

/**
 * Deeply compares two values for equality, handling objects, arrays, dates, regex, maps, sets, symbols, and BigInt.
 * 
 * @param {any} a - The first value to compare.
 * @param {any} b - The second value to compare.
 * @param {boolean | { ordered: boolean }} [options=true] - If true, arrays are compared in order, otherwise unordered.
 * @param {WeakMap<any, any>} [seen=new WeakMap()] - A map used to track circular references during comparison.
 * @returns {boolean} - Returns true if the values are deeply equal, false otherwise.
 * 
 * @example
 * // Comparing primitive values
 * console.log(isEqual(5, 5));  // ✅ true
 * console.log(isEqual(5, '5'));  // ❌ false
 * 
 * @example
 * // Comparing arrays (ordered)
 * console.log(isEqual([1, 2, 3], [1, 2, 3]));  // ✅ true
 * console.log(isEqual([1, 2, 3], [3, 2, 1]));  // ❌ false (because default ordered is true)
 * 
 * @example
 * // Comparing arrays (unordered)
 * console.log(isEqual([1, 2, 3], [3, 2, 1], { ordered: false }));  // ✅ true
 * 
 * @example
 * // Comparing objects (unordered)
 * console.log(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));  // ✅ true
 * console.log(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 }));  // ❌ false
 * 
 * @example
 * // Comparing objects with nested objects
 * console.log(isEqual({ a: { b: 2 } }, { a: { b: 2 } }));  // ✅ true
 * console.log(isEqual({ a: { b: 2 } }, { a: { b: 3 } }));  // ❌ false
 * 
 * @example
 * // Comparing Dates
 * console.log(isEqual(new Date('2025-05-01'), new Date('2025-05-01')));  // ✅ true
 * console.log(isEqual(new Date('2025-05-01'), new Date('2025-05-02')));  // ❌ false
 * 
 * @example
 * // Comparing Maps
 * const map1 = new Map([['key1', 'value1'], ['key2', 'value2']]);
 * const map2 = new Map([['key1', 'value1'], ['key2', 'value2']]);
 * console.log(isEqual(map1, map2));  // ✅ true
 * 
 * @example
 * // Comparing Sets
 * const set1 = new Set([1, 2, 3]);
 * const set2 = new Set([1, 2, 3]);
 * console.log(isEqual(set1, set2));  // ✅ true
 * 
 * @example
 * // Comparing Symbol
 * const sym1 = Symbol('sym');
 * const sym2 = Symbol('sym');
 * sym1.description === sym2.description ✅ true;
 * console.log(isEqual(sym1, sym2));  // ✅ true (compared symbol description)
 * 
 * @example
 * // Comparing BigInt
 * console.log(isEqual(BigInt(123), BigInt(123)));  // ✅ true
 * console.log(isEqual(BigInt(123), BigInt(124)));  // ❌ false
 */
export function isEqual(
  a: any,
  b: any,
  options: boolean | { ordered: boolean } = true,
  seen: WeakMap<object, object> = new WeakMap()
): boolean {
  const normalizedOptions = isBoolean(options)
    ? { ordered: options }
    : options || { ordered: true };
  // Early return for strict equality (fast path)
  if (a === b) return true;

  // If either is null or undefined, they must be strictly equal to be equal
  if (a == null || b == null || typeof a !== typeof b) return false;

  // NaN === NaN
  if (isNumber(a) && isNumber(b)  && isNaN(a) && isNaN(b)) {
    return true;
  }

  // Symbol
  if( isSymbol(a) && isSymbol(b)) {
    return a.description === b.description;
  }

  // BigInt
  if (isBigInt(a) && isBigInt(b)) {
    return a === b;
  }

  //Boolean
  if (isBoolean(a) && isBoolean(b)) {
    return a === b;
  }

  // Date
  if (isDate(a) && isDate(b)) {
    return a.getTime() === b.getTime();
  }

  // RegExp
  if (isRegExp(a) && isRegExp(b)) {
    return a.source === b.source && a.flags === b.flags;
  }
  // Array
  if (isArray(a) && isArray(b)) {
    return isEqualArray(a, b, normalizedOptions, seen)
  }

  // ArrayBuffer
  if (isArrayBuffer(a) && isArrayBuffer(b)) {
    if (a.byteLength !== b.byteLength) return false;
    const viewA = new Uint8Array(a);
    const viewB = new Uint8Array(b);
    for (const [i, byte] of viewA.entries()) {
      if (byte !== viewB[i]) return false;
    }
    return true;
  }

  // TypedArray
  if (isTypedArray(a) && isTypedArray(b)) {
    if (a.constructor !== b.constructor || a.byteLength !== b.byteLength) return false;
    
    const viewA = new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
    const viewB = new Uint8Array(b.buffer, b.byteOffset, b.byteLength);
    for (const [i, byte] of viewA.entries()) {
      if (byte !== viewB[i]) return false;
    }
    return true;
  }
  if(isDataView(a) && isDataView(b)) {
    if (a.constructor!== b.constructor || a.byteLength!== b.byteLength) return false;
    for (let i = 0; i < a.byteLength; i++) {
      if (a.getUint8(i) !== b.getUint8(i)) return false;
    }
    return true;
  }

  // Set
  if (isSet(a) && isSet(b)) {
    return isEqualSet(a, b, {ordered:true}, seen);
  }

  // Map
  if (isMap(a) && isMap(b)) {
    return isEqualMap(a, b, {ordered:true}, seen);
  }

  // Object
  if (isPlainObject(a) && isPlainObject(b)) {
    return isEqualObject(a, b, {ordered:false}, seen);
  }

  return false;
}


/**
 * Deeply compares two arrays for equality.
 * 
 * @param {any[]} a - The first array to compare.
 * @param {any[]} b - The second array to compare.
 * @param {Object} options - The comparison options.
 * @param {boolean} options.ordered - If true, arrays are compared in order, otherwise unordered.
 * @param {WeakMap<any, any>} seen - A map used to track circular references.
 * @returns {boolean} - Returns true if the arrays are deeply equal, false otherwise.
 */
function isEqualArray(a: any[], b: any[], options: { ordered: boolean }, seen: WeakMap<any, any>): boolean {
  if (a.length !== b.length) return false;

  // Handle ordered comparison
  if (options.ordered) {
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], options, seen)) return false;
    }
    return true;
  } else {
    // Handle unordered comparison
    const used = new Array(b.length).fill(false);
    for (const itemA of a) {
      let matched = false;
      for (let i = 0; i < b.length; i++) {
        if (!used[i] && isEqual(itemA, b[i], options, seen)) {
          used[i] = true;
          matched = true;
          break;
        }
      }
      if (!matched) return false;
    }
    return true;
  }
}

/**
 * Deeply compares two objects for equality.
 * 
 * @param {Record<any, any>} a - The first object to compare.
 * @param {Record<any, any>} b - The second object to compare.
 * @param {Object} options - The comparison options.
 * @param {boolean} options.ordered - If true, arrays are compared in order, otherwise unordered.
 * @param {WeakMap<any, any>} seen - A map used to track circular references.
 * @returns {boolean} - Returns true if the objects are deeply equal, false otherwise.
 */
function isEqualObject(a: Record<any, any>, b: Record<any, any>, options: { ordered: boolean }, seen: WeakMap<any, any>): boolean {
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // If the number of keys doesn't match, they can't be equal
  if (keysA.length !== keysB.length) return false;

  // Compare each key-value pair
  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
    if (!isEqual(a[key], b[key], options, seen)) return false;
  }

  return true;
}

/**
 * Deeply compares two maps for equality.
 * 
 * @param {Map<any, any>} mapA - The first map to compare.
 * @param {Map<any, any>} mapB - The second map to compare.
 * @param {Object} options - The comparison options.
 * @param {boolean} options.ordered - If true, arrays are compared in order, otherwise unordered.
 * @param {WeakMap<any, any>} seen - A map used to track circular references.
 * @returns {boolean} - Returns true if the maps are deeply equal, false otherwise.
 */
function isEqualMap(mapA: Map<any, any>, mapB: Map<any, any>, options: { ordered: boolean }, seen: WeakMap<any, any>): boolean {
  if (mapA.size !== mapB.size) return false;

  // Compare entries
  const entriesA = mapA.entries();
  const entriesB = mapB.entries();

  while (true) {
    const entryA = entriesA.next();
    const entryB = entriesB.next();
    if (entryA.done && entryB.done) break;
    if (entryA.done || entryB.done) return false;

    const [keyA, valueA] = entryA.value;
    const [keyB, valueB] = entryB.value;

    if (!isEqual(keyA, keyB, options, seen) || !isEqual(valueA, valueB, options, seen)) {
      return false;
    }
  }

  return true;
}

/**
 * Deeply compares two sets for equality.
 * 
 * @param {Set<any>} setA - The first set to compare.
 * @param {Set<any>} setB - The second set to compare.
 * @param {Object} options - The comparison options.
 * @param {boolean} options.ordered - If true, arrays are compared in order, otherwise unordered.
 * @param {WeakMap<any, any>} seen - A map used to track circular references.
 * @returns {boolean} - Returns true if the sets are deeply equal, false otherwise.
 */
function isEqualSet(setA: Set<any>, setB: Set<any>, options: { ordered: boolean }, seen: WeakMap<any, any>): boolean {
  if (setA.size !== setB.size) return false;

  // Compare each value in the Set
  const valuesA = setA.values();
  const valuesB = setB.values();

  while (true) {
    const valueA = valuesA.next();
    const valueB = valuesB.next();
    if (valueA.done && valueB.done) break;
    if (valueA.done || valueB.done) return false;

    if (!isEqual(valueA.value, valueB.value, options, seen)) {
      return false;
    }
  }

  return true;
}