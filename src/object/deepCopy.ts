import {isNull,isObjectLike, isFunction, isSymbol, isBigInt, isWeakMap, isWeakSet} from '../type';
import {hasOwn} from './hasOwn'

/**
 * @description Copy strategy function type
 * @param {any} obj - The object to copy
 * @param {WeakMap<object, any>} seen - WeakMap for cache to handle circular references
 * @param {DeepCopyCallback} callback - Recursive deepCopy function reference
 * @returns {any} - The copied object
 */
type CopyStrategy = (
  obj: any,
  seen: WeakMap<object, any>,
  callback: DeepCopyCallback
) => any;

/**
 * @description Deep copy function type
 */
type DeepCopyCallback = (obj: any, seen?: WeakMap<object, any>) => any;

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

/**
 * @description Deep copy an object.
 * Unsupported types like functions, symbols, WeakMap, WeakSet will trigger a warning and return original.
 * @param {any} obj - The object to deep copy
 * @param {WeakMap<object, any>} [seen=new WeakMap()] - WeakMap cache to track copied references
 * @returns {any} - Deep copied object
 * 
 * @example
 * const original = { name: "Alice", details: { age: 25 } };
 * const copy = deepCopy(original);
 * console.log(copy.details.age); // 25
 * console.log(copy !== original); // true
 *
 * @example
 * const arr = [1, { nested: true }, [3]];
 * const copy = deepCopy(arr);
 * console.log(copy[1].nested); // true
 *
 * @example
 * const map = new Map<string, number>([["a", 1], ["b", 2]]);
 * const copy = deepCopy(map);
 * console.log(copy.get("b")); // 2
 *
 * @example
 * const set = new Set([1, 2, 3]);
 * const copy = deepCopy(set);
 * console.log(copy.has(2)); // true
 *
 * @example
 * const date = new Date("2020-01-01");
 * const copy = deepCopy(date);
 * console.log(copy.getFullYear()); // 2020
 *
 * @example
 * const regex = /abc/gi;
 * const copy = deepCopy(regex);
 * console.log(copy.source); // "abc"
 * console.log(copy.flags); // "gi"
 *
 * @example
 * const obj: any = {};
 * obj.self = obj;
 * const copy = deepCopy(obj);
 * console.log(copy.self === copy); // true
 */
export function deepCopy(obj: any, seen: WeakMap<object, any> = new WeakMap()): any {

  if (isNull(obj) || !isObjectLike(obj)) return obj;

  // Warn unsupported types
  if (
    isFunction(obj) ||
    isSymbol(obj) ||
    isBigInt(obj) ||
    isWeakMap(obj) ||
    isWeakSet(obj)
  ) {
    console.warn(`⚠️ Warning: Unsupported type "${obj.constructor.name || typeof obj}" encountered, returning original.`);
    return obj;
  }

  // Return cached copy if circular reference detected
  if (seen.has(obj)) return seen.get(obj);

  // Get the object type string, e.g. 'Date', 'Array', 'Object'
  const type = Object.prototype.toString.call(obj).slice(8, -1);

  // Use strategy
  if (type in strategies) {
    return strategies[type](obj, seen, deepCopy);
  }

  // Default: plain object copy
  const copy: any = {};
  seen.set(obj, copy);
  for (const key in obj) {
    if (hasOwn(obj, key)) {
      copy[key] = deepCopy(obj[key], seen);
    }
  }
  return copy;
}
