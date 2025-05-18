/**
 * Retrieves the element at the specified index in the array.
 * Supports negative indices, which count from the end of the array.
 * 
 * @template T - The type of elements in the array.
 * @param {T[]} arr - The input array.
 * @param {number} index - The index of the element to retrieve. Can be negative.
 * @returns {T | undefined} - The element at the specified index, or undefined if the index is out of bounds or the array is empty.
 * 
 * @example
 * const arr = [1, 2, 3, 4, 5];
 * at(arr, 2); // Returns 3
 * at(arr, -1); // Returns 5
 * at([], 0); // Returns undefined
 */
export function at<T>(arr: T[], index: number): T | undefined {
  const len = arr.length;
  if (len === 0) return undefined;
  
  // 处理负数索引
  if (index < 0) {
    index = len + index;
  }
  
  return arr[index];
}