/**
 * Inserts a string after the specified character or index.
 * 
 * @param input The input string
 * @param insertText The string to insert
 * @param target The character or index after which to insert
 * @returns The updated string
 * @example
 * insertAfter('hello', 'X', 1) // ✅ 'heXllo'
 * insertAfter('foo-bar', '_', '-') // ✅ 'foo-_bar'
 */
export function insertAfter(input: string, insertText: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  if (index < 0 || index >= input.length) return input;
  return input.slice(0, index + 1) + insertText + input.slice(index + 1);
}
