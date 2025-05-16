import { words } from "./words";

/**
 * Converts a string into snake_case.
 *
 * This function transforms camelCase, PascalCase, kebab-case, and space-separated strings
 * into snake_case format by:
 * - Inserting underscores between lowercase and uppercase letter transitions
 * - Replacing spaces and hyphens with underscores
 * - Converting all letters to lowercase
 *
 * @param {string} str - The input string to convert.
 * @returns {string} A snake_case formatted string.
 *
 * @example
 * toSnakeCase('helloWorld'); // ✅ 'hello_world'
 * toSnakeCase('HelloWorld'); // ✅ 'hello_world'
 * toSnakeCase('hello-world'); // ✅ 'hello_world'
 * toSnakeCase('hello world'); // ✅ 'hello_world'
 * toSnakeCase('APIVersion');  // ✅ 'api_version'
 * toSnakeCase('MyXMLParser'); // ✅ 'my_xml_parser
 */
export function toSnakeCase(str: string): string {
	return words(str).map(w => w.toLowerCase()).join('_');
}
