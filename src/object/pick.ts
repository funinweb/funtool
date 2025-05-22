import {keys} from './keys'

type ExistingKeys<T> = keyof T & string;
/**
 * @description Creates a new object composed of the picked properties.
 * @param obj The source object
 * @param keysToPick An array of keys to pick from the source object
 * @returns A new object containing only the picked keys
 * 
 * @example
 * const user = { name: 'Alice', age: 25, password: 'secret' };
 * const partialUser = pick(user, ['name', 'age']);
 * console.log(partialUser); // ✅ { name: 'Alice', age: 25 }
 */
export function pick<T extends object, K extends string>(
  obj: T,
  keysToPick: readonly K[]
): Pick<T, Extract<K, ExistingKeys<T>>> {
  const result = {} as Pick<T, Extract<K, ExistingKeys<T>>>;
  for (const key of keysToPick) {
    if (key in obj) {
      (result as any)[key] = (obj as any)[key as keyof K]
    }
  }
  return result;
}


/**
 * @description Creates a new object composed of properties that satisfy the predicate function.
 * @param obj The source object
 * @param predicate A function invoked with (value, key) that returns `true` to keep the property
 * @returns A new object with properties that satisfy the predicate
 * 
 * @example
 * const user = { name: 'Alice', age: 25, isActive: false };
 * const activeProps = pickBy(user, (value) => Boolean(value));
 * console.log(activeProps); // ✅ { name: 'Alice', age: 25 }
 */
export function pickBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  for (const key in obj) {
    if (predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  }
  return result;
}
