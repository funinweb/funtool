/**
 * Converts the character at a specific index or matching a character to uppercase.
 * 
 * @param input The input string
 * @param target A character or index to transform
 * @returns The transformed string
 * @example
 * toUpperAt('hello', 0) // ✅ 'Hello'
 * toUpperAt('foo-bar', 'b') // ✅ 'foo-Bar'
 */
export function toUpperAt(input: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  if (index < 0 || index >= input.length) return input;
  return input.slice(0, index) + input[index].toUpperCase() + input.slice(index + 1);
}
