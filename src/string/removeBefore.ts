/**
 * Removes all characters before the specified character or index.
 * 
 * @param input The input string
 * @param target Character or index before which content is removed
 * @returns The sliced string
 * @example
 * removeBefore('foo-bar', '-') // ✅ 'bar'
 * removeBefore('hello', 3) // ✅ 'lo'
 */
export function removeBefore(input: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  return index >= 0 ? input.slice(index) : input;
}
