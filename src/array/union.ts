/**
 * Get the union of two arrays
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array containing elements from both arrays without duplicates
 * @example
 * union([1, 2], [2, 3]) // ✅ [1, 2, 3]
 * union(['a'], ['b', 'a']) // ✅ ['a', 'b']
 */
export function union<T>(arr1: T[], arr2: T[]): T[] {
  return [...new Set([...arr1, ...arr2])];
}