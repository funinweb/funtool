import { words } from "./words";

/**
 * Converts a string to kebab-case.
 *
 * @param {string} str - The input string (e.g., "helloWorld").
 * @returns {string} The kebab-case version of the string.
 *
 * @example
 * toKebabCase('helloWorld'); // ✅ 'hello-world'
 * toKebabCase('HelloWorld'); // ✅ 'hello-world'
 * toKebabCase('myXMLParser'); // ✅ 'my-xml-parser'
 * toKebabCase('MyXMLParser'); // ✅ 'my-xml-parser'
 * toKebabCase('hello_world'); // ✅ 'hello-world'
 * toKebabCase('APIversion'); // ✅ 'ap-iversion'
 * toKebabCase('userID_token'); // ✅ 'user-id-token'
 * toKebabCase('JSONData'); // ✅ 'json-data'
 */
export function toKebabCase(str: string): string {
	return words(str).map(w => w.toLowerCase()).join('-');
}
