/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @returns {string} The string with the first character in uppercase.
 *
 * @example
 * capitalizeFirstLetter('hello'); // ✅ 'Hello'
 */
export function capitalizeFirstLetter(str: string): string {
	if (!str) return ""
	return str.charAt(0).toUpperCase() + str.slice(1)
}
