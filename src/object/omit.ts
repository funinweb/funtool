import {keys} from './keys'

type ExistingKeys<T> = keyof T & string;
/**
 * @description Creates a new object by omitting the specified keys from the original object.
 * @param obj The source object
 * @param keysToOmit An array of keys to omit
 * @returns A new object without the specified keys
 * 
 * @example
 * const user = { name: 'Alice', age: 25, password: 'secret' };
 * const safeUser = omit(user, ['password']);
 * console.log(safeUser); // ✅ { name: 'Alice', age: 25 }
 */
export function omit<T extends object, K extends string>(
  obj: T,
  keysToOmit: K[]
): Omit<T, Extract<K, ExistingKeys<T>>> {
  const result = {} as Omit<T, Extract<K, ExistingKeys<T>>>

  keys(obj).forEach((key) => {
    // Only copy keys that are NOT in keys to omit
    if (!keysToOmit.includes(key as any)) {
      (result as any)[key] = obj[key as keyof T];
    }
  });

  return result;
}

/**
 * @description Creates a new object by omitting properties that match the predicate function.
 * @param obj The source object
 * @param predicate A function that returns `true` if the property should be omitted
 * @returns A new object without the properties that match the predicate
 * 
 * @example
 * const user = { name: 'Alice', age: null, isActive: true };
 * const cleaned = omitBy(user, (value) => value === null);
 * console.log(cleaned); // ✅ { name: 'Alice', isActive: true }
 */
export function omitBy<T extends object>(
  obj: T,
  predicate: (value: T[keyof T], key: keyof T) => boolean
): Partial<T> {
  const result = {} as Partial<T>;
  keys(obj).forEach((key) => {
    if (!predicate(obj[key], key)) {
      result[key] = obj[key];
    }
  })
  return result;
}