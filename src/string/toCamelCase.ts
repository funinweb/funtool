import { words } from "./words";

/**
 * Converts a string to camelCase.
 *
 * @param {string} str - The input string (e.g., "hello_world").
 * @returns {string} The camelCase version of the string.
 *
 * @example
 * toCamelCase('hello_world'); // ✅ 'helloWorld'
 * toCamelCase('hello-world'); // ✅ 'helloWorld'
 * toCamelCase('api_version'); // ✅ 'apiVersion'
 * toCamelCase('API_version'); // ✅ 'apiVersion'
 * toCamelCase('my-xml-parser'); // ✅ 'myXmlParser'
 */
export function toCamelCase(str: string): string {
	if (!str) return ""
	const [first, ...rest] = words(str);
  return [
    first.toLowerCase(),
    ...rest.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()),
  ].join('');
}
