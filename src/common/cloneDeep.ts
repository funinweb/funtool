import {isNull,isObjectLike, isFunction, isSymbol, isBigInt, isWeakMap, isWeakSet} from '../type';
import {hasOwn} from '../object/hasOwn'
import {keys} from '../object/keys'

// Basic primitive types that don't need deep copy
type Primitive = string | number | boolean | bigint | symbol | null | undefined;
/**
 * Determines if a type is a Tuple (i.e., fixed-length array)
 * Tuples have known numeric literal keys and `length` is a constant number.
 */
type IsTuple<T> = T extends readonly any[]
  ? number extends T['length']
    ? false
    : true
  : false;

/**
 * Recursive deep copy type utility.
 * - Preserves tuples and arrays
 * - Removes `readonly` from properties
 * - Recursively copies object properties, including symbol keys
 */
export type CloneDeep<T> =
  // Leave primitive types and functions unchanged
  T extends Primitive | ((...args: any[]) => any)
    ? T
    : // If it's a Tuple, preserve exact index types
    IsTuple<T> extends true
    ? { [K in keyof T]: CloneDeep<T[K]> }
    : // If it's an array (not a Tuple), deeply copy elements
    T extends ReadonlyArray<infer U>
    ? Array<CloneDeep<U>>
    : // Deep copy Map values
    T extends Map<infer K, infer V>
    ? Map<K, CloneDeep<V>>
    : // Deep copy Set values
    T extends Set<infer U>
    ? Set<CloneDeep<U>>
    : // Retain specific built-in object types
    T extends Date
    ? Date
    : T extends RegExp
    ? RegExp
    : // Deep copy plain object, removing `readonly` and preserving symbol keys
    T extends object
    ? {
        -readonly [K in keyof T]: CloneDeep<T[K]>;
      } & {
        [K in keyof T as K extends symbol ? K : never]: CloneDeep<T[K]>;
      }
    : T;

/**
 * @description Customizer function type for cloneDeepWith
 * If it returns `undefined`, cloneDeepWith falls back to default deep cloning logic
 */
export type CloneDeepCustomizer = (value: any, key?: PropertyKey, object?: any) => any;

/**
 * @description Copy strategy function type
 * @param {any} obj - The object to copy
 * @param {WeakMap<object, any>} seen - WeakMap for cache to handle circular references
 * @param {CloneDeepCallback} callback - Recursive cloneDeep function reference
 * @returns {any} - The copied object
 */
type CopyStrategy = (
  obj: any,
  seen: WeakMap<object, any>,
  callback: CloneDeepCallback
) => any;

/**
 * @description Deep copy function type
 */
type CloneDeepCallback = (obj: any, seen?: WeakMap<object, any>) => any;

/**
 * @description Strategies for different object types deep copy
 */
const strategies: Record<string, CopyStrategy> = {
  Date: (obj:Date) => new Date(obj.getTime()),
  RegExp: (obj:RegExp) => new RegExp(obj.source, obj.flags),
  Array: (obj:any[], seen, callback) => {
    const copy: any[] = [];
    seen.set(obj, copy);
    obj.forEach((item: any, index: number) => {
      copy[index] = callback(item, seen);
    });
    return copy;
  },
  Map: (obj:Map<any, any>, seen, callback) => {
    const copy = new Map();
    seen.set(obj, copy);
    obj.forEach((value, key) => {
      copy.set(key, callback(value, seen));
    });
    return copy;
  },
  Set: (obj:Set<any>, seen, callback) => {
    const copy = new Set();
    seen.set(obj, copy);
    obj.forEach((value) => {
      copy.add(callback(value, seen));
    });
    return copy;
  },
};

function _cloneInternal<T>(
  obj: T,
  seen: WeakMap<object, any>,
  callback: CloneDeepCallback,
  customizer?: CloneDeepCustomizer
): CloneDeep<T> {
  if (isNull(obj) || !isObjectLike(obj)) return obj as CloneDeep<T>;

  if (
    isFunction(obj) ||
    isSymbol(obj) ||
    isBigInt(obj) ||
    isWeakMap(obj) ||
    isWeakSet(obj)
  ) {
    const typeName = (typeof obj === 'object' && obj !== null && 'constructor' in obj)
      ? (obj.constructor?.name || typeof obj)
      : typeof obj;
    console.warn(`⚠️ Warning: Unsupported type "${typeName}" encountered, returning original.`);
    return obj as CloneDeep<T>;
  }

  if (seen.has(obj as any)) return seen.get(obj as any);

  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (type in strategies) {
    return strategies[type](obj, seen, callback) as CloneDeep<T>;
  }

  const copy: any = {};
  seen.set(obj as any, copy);
  //TODO for...in no support Symbol
  // for (const key in obj) {
  //   if (hasOwn(obj, key)) {
  //     copy[key] = cloneDeep(obj[key], seen);
  //   }
  // }
  keys(obj as any).forEach((key) => {
    if (hasOwn(obj as any, key)) {
      const val = (obj as any)[key];
      const result = customizer?.(val, key, obj);
      copy[key] = result !== undefined ? result : callback(val, seen);
    }
  });
  return copy;
}

/**
 * @description Deep copy an object.
 * Unsupported types like functions, symbols, WeakMap, WeakSet will trigger a warning and return original.
 * @param {any} obj - The object to deep copy
 * @param {WeakMap<object, any>} [seen=new WeakMap()] - WeakMap cache to track copied references
 * @returns {any} - Deep copied object
 * 
 * @example
 * const original = { name: "Alice", details: { age: 25 } };
 * const copy = cloneDeep(original);
 * console.log(copy.details.age); // ✅ 25
 * console.log(copy !== original); // ✅ true
 *
 * @example
 * const arr = [1, { nested: true }, [3]];
 * const copy = cloneDeep(arr);
 * console.log(copy[1].nested); // ✅ true
 *
 * @example
 * const map = new Map<string, number>([["a", 1], ["b", 2]]);
 * const copy = cloneDeep(map);
 * console.log(copy.get("b")); // ✅ 2
 *
 * @example
 * const set = new Set([1, 2, 3]);
 * const copy = cloneDeep(set);
 * console.log(copy.has(2)); // ✅ true
 *
 * @example
 * const date = new Date("2020-01-01");
 * const copy = cloneDeep(date);
 * console.log(copy.getFullYear()); // ✅ 2020
 *
 * @example
 * const regex = /abc/gi;
 * const copy = cloneDeep(regex);
 * console.log(copy.source); // ✅ "abc"
 * console.log(copy.flags); // ✅ "gi"
 *
 * @example
 * const obj: any = {};
 * obj.self = obj;
 * const copy = cloneDeep(obj);
 * console.log(copy.self === copy); // ✅ true
 */
export function cloneDeep<T>(obj: T, seen: WeakMap<object, any> = new WeakMap()): CloneDeep<T>  {
  return _cloneInternal(obj, seen, cloneDeep);
}

/**
 * @description Deep copy with customizer support.
 * @param {any} obj - The object to clone
 * @param {CloneDeepCustomizer} customizer - Custom clone handler, can override cloning behavior
 * @param {WeakMap<object, any>} [seen=new WeakMap()] - Circular reference cache
 * @returns {any} - Cloned object with possible customization
 * 
 * @example
 * const original = { x: new Date(), y: 123 };
 * const copy = cloneDeepWith(original, (val) => {
 *   if (val instanceof Date) return 'DATE';
 * });
 * console.log(copy.x); // ✅ "DATE"
 */
export function cloneDeepWith<T>(
  obj: T,
  customizer: CloneDeepCustomizer,
  seen: WeakMap<object, any> = new WeakMap()
): CloneDeep<T> {

  const innerClone: CloneDeepCallback = (value, seenMap = seen): any => {
    // Apply customizer first
    const customized = customizer(value);
    if (customized !== undefined) return customized;

    // Fallback to default cloneDeep logic
    return _cloneInternal(value, seenMap, innerClone, customizer);
  };

  return innerClone(obj);
}
