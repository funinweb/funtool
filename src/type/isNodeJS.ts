/**
 * Check if the current environment is Node.js
 * @returns Returns true if the environment is Node.js, otherwise returns false
 * @example
 * isNodeJS() // => ✅ true (in Node.js)
 * isNodeJS() // => ❌ false (in browser)
 */
export function isNodeJS(): boolean {
  // @ts-ignore
  return typeof process !== 'undefined' && !!process.versions?.node;
}