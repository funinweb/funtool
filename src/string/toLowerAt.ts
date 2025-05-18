/**
 * Converts the character at a specific index or matching a character to lowercase.
 * 
 * @param input The input string
 * @param target A character or index to transform
 * @returns The transformed string
 * @example
 * toLowerAt('Hello', 0) // ✅ 'hello'
 * toLowerAt('Foo-Bar', 'B') // ✅ 'Foo-bar'
 */
export function toLowerAt(input: string, target: string | number): string {
  const index = typeof target === 'number' ? target : input.indexOf(target);
  if (index < 0 || index >= input.length) return input;
  return input.slice(0, index) + input[index].toLowerCase() + input.slice(index + 1);
}
