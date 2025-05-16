/**
 * Get the intersection of two arrays
 * @param arr1 - The first array
 * @param arr2 - The second array
 * @returns A new array containing elements present in both arrays
 * @example
 * intersect([1, 2, 3], [2, 3, 4]) // ✅ [2, 3]
 * intersect(['a', 'b'], ['b', 'c']) // ✅ ['b']
 */
export function intersect<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}