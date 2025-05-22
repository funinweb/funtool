import { isArray, isPlainObject, isPrimitive } from "../type";
import { keys } from "./keys";
/**
 * Merges two objects into one. Properties from the second object
 * will overwrite those from the first object in case of conflicts.
 * Symbol keys are also supported.
 *
 * @template T - The type of the first object
 * @template U - The type of the second object
 * @param target - The target object to receive properties
 * @param source - The source object to copy properties from
 * @returns A new object with merged properties
 *
 * @example
 * ```ts
 * const sym = Symbol('id');
 * const a = { name: 'Alice', age: 25 };
 * const b = { age: 30, [sym]: 123 };
 * const result = merge(a, b);
 * // result: { name: 'Alice', age: 30, [sym]: 123 }
 * ```
 */
export function merge<T extends object, U extends object>(target: T, source: U): T & U {
  const result = { ...target } as T & U;
  keys(source).forEach((key) => {
    const descriptor = Object.getOwnPropertyDescriptor(source, key);
    if(descriptor) {
      Object.defineProperty(result, key, descriptor);
    }
  });
  return result;
}

/**
 * Recursively deep merges two objects. Properties from the source object
 * will overwrite those in the target. Arrays are overwritten by default.
 * Symbol keys are also supported.
 *
 * @template T - The type of the first object
 * @template U - The type of the second object
 * @param target - The target object to receive properties
 * @param source - The source object to merge from
 * @returns A new object deeply merged from target and source
 *
 * @example
 * ```ts
 * const a = { user: { name: 'Alice', hobbies: [{ sport: 'tennis' }] } };
 * const b = { user: { age: 30, hobbies: [{ level: 'pro' }] } };
 * const result = mergeDeep(a, b);
 * // result: { user: { name: 'Alice', age: 30, hobbies: [{ sport: 'tennis', level: 'pro' }] } }
 * ```
 */
export function mergeDeep<T extends object, U extends object>(target: T, source: U): T & U {
  if (isArray(target) && isArray(source)) {
    const maxLength = Math.max(target.length, source.length);
    const merged: any[] = [];

    for (let i = 0; i < maxLength; i++) {
      const t = target[i];
      const s = source[i];

      if (!isPrimitive(t) && !isPrimitive(s)) {
        merged[i] = mergeDeep(t, s);
      } else {
        merged[i] = s !== undefined ? s : t;
      }
    }

    return merged as any;
  }

  if (isPlainObject(target) && isPlainObject(source)) {
    const result = { ...target } as any;

    keys(source).forEach((key) => {
      const t = (target as any)[key];
      const s = (source as any)[key];
      if (!isPrimitive(t) && !isPrimitive(s)) {
        result[key] = mergeDeep(t, s);
      } else {
        result[key] = s;
      }
    })

    return result;
  }

  return source as any;
}
