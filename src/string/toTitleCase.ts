/**
 * Converts a string into Title Case (each word capitalized, separated by spaces).
 *
 * - Converts the entire string to lowercase first
 * - Capitalizes the first letter of each word (detected via space, hyphen, or underscore)
 * - Replaces underscores and hyphens with spaces
 *
 * Note: Acronyms or all-caps words will be normalized to capitalized first-letter only.
 *
 * @param {string} str - The input string to convert.
 * @returns {string} A string in Title Case format.
 *
 * @example
 * toTitleCase('hello_world');   // ✅ 'Hello World'
 * toTitleCase('hello-world');   // ✅ 'Hello World'
 * toTitleCase('hello world');   // ✅ 'Hello World'
 * toTitleCase('user_id');       // ✅ 'User Id'
 * toTitleCase('API_version');   // ✅ 'Api Version'
 */
export function toTitleCase(str: string): string {
	return str
		.toLowerCase()
		.replace(/[_\-]+/g, " ") // normalize delimiters to space
		.replace(/\b([a-z])([a-z]*)/g, (_, first, rest) => first.toUpperCase() + rest)
}
