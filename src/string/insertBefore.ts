/**
 * Inserts a string before the specified character or index.
 * 
 * @param input The input string
 * @param insertText The string to insert
 * @param target The character or index before which to insert
 * @returns The updated string
 * @example
 * insertBefore('hello', 'X', 1) // ✅ 'hXello'
 * insertBefore('foo-bar', '_', '-') // ✅ 'foo_-bar'
 */
export function insertBefore(input: string, insertText: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  if (index < 0 || index > input.length) return input;
  return input.slice(0, index) + insertText + input.slice(index);
}
