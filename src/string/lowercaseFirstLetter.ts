/**
 * Lowercases the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The string with the first character in lowercase.
 *
 * @example
 * lowercaseFirstLetter('Hello'); // ✅ 'hello'
 */
export function lowercaseFirstLetter(str: string): string {
	if (!str) return ""
	return str.charAt(0).toLowerCase() + str.slice(1)
}
