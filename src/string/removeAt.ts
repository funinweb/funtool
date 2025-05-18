/**
 * Removes the character at a specific index or matching a character.
 * 
 * @param input The input string
 * @param target A character or index to remove
 * @returns The updated string
 * @example
 * removeAt('hello', 1) // ✅ 'hllo'
 * removeAt('abc-def', '-') // ✅ 'abcdef'
 */
export function removeAt(input: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  if (index < 0 || index >= input.length) return input;
  return input.slice(0, index) + input.slice(index + 1);
}
