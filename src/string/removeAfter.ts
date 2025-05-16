/**
 * Removes all characters after the specified character or index.
 * 
 * @param input The input string
 * @param target Character or index after which content is removed
 * @returns The sliced string
 * @example
 * removeAfter('foo-bar', '-') // ✅ 'foo-'
 * removeAfter('hello', 3) // ✅ 'hel'
 */
export function removeAfter(input: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  return index >= 0 ? input.slice(0, index + 1) : input;
}
