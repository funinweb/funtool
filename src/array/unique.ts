/**
 * Remove duplicate values from an array
 * @param arr - The array to process
 * @returns A new array with unique values
 * @example
 * unique([1, 2, 2, 3]) // ✅ [1, 2, 3]
 * unique(['a', 'b', 'a']) // ✅ ['a', 'b']
 */
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}