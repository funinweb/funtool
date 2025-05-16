/**
 * Remove specified values from an array
 * @param arr - The array to process
 * @param values - The values to remove
 * @returns A new array with specified values removed
 * @example
 * remove([1, 2, 3], [2]) // ✅ [1, 3]
 * remove(['a', 'b', 'c'], ['b', 'c']) // ✅ ['a']
 */
export function remove<T>(arr: T[], values: T[]): T[] {
  return arr.filter(item => !values.includes(item));
}