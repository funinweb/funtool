import { words } from "./words";
import { toCamelCase } from "./toCamelCase"

/**
 * Converts a string to PascalCase.
 *
 * @param {string} str - The input string (e.g., "hello_world").
 * @returns {string} The PascalCase version of the string.
 *
 * @example
 * toPascalCase('hello_world'); // ✅ 'HelloWorld'
 * toPascalCase('api_version'); // ✅ 'ApiVersion'
 * toPascalCase('API_version'); // ✅ 'APIVersion'
 * toPascalCase('my-xml-parser'); // ✅ 'MyXmlParser'
 */
export function toPascalCase(str: string): string {
	return words(str)
    .map(word => /^[A-Z0-9]+$/.test(word) ? word : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
}
