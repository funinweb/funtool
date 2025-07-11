# Changelog

`funtool` strictly follows [Semantic Versioning 2.0.0](https://semver.org/) specification.

#### Release Schedule

- Patch version: bugfix updates (can be released anytime for urgent bugs).
- Minor version: new feature iterations.
- Major version: breaking changes and new features.

---

## 1.2.0

*2025-07-11*

### ✨ Features

- add `MathX` utility class supporting chainable calls and custom precision
  - Introduce MathX class for flexible math operations with configurable precision and rounding modes
  - Add bilingual documentation (English/Chinese) and comprehensive test cases
  - Update build config and i18n files to support new features



## 1.1.1

*2025-07-02*

### 🐞 Bug Fixes

- add explicit type declaration paths in rollup.config.js and package.json



## 1.1.0

*2025-06-16*

### ✨ Features

- Function Utilities Module,Includes
  - Added `ObjectId` class for MongoDB-style ID generation and manipulation
  - Added `awaitTo` utility for error handling with async/await
  - Added `base64ToBlob` and `base64ToFormData` for base64 conversion
  - Added `currying` function for functional programming patterns
  - Added `debounce` and throttle functions for event rate limiting
  - Added `generateVerificationCode` for random code generation
  - Added `getBrowserType` and `parseUA` for user agent parsing
  - Added `parseQuery` , `parseQueryDeep` , `urlParse` , and `urlStringify` for URL handling
  - Added `random` utility for random number generation
  - Add Chinese and English documentation with usage examples
  - Add complete unit tests

### 📖 Documentation

- Update README with documentation links


## 1.0.0

*2025-06-05*

### ✨ Features

- Initial setup of complete documentation site
- Added full Chinese and English versions of the documentation
- Configured deployment settings for documentation site
- Added documentation for built-in regex plugins (e.g., email, phone, etc.)
- Documented regex module with complete API references

### ♻️ Refactors

- Refactored regex validation logic and plugin structure


## 1.0.0-rc.0

*2025-05-26*

### ♻️ Refactors

- Facilitates various string operations, including:
  - `capitalizeFirstLetter`: Capitalize the first letter of a string
  - `count`: Count the occurrence of a specific substring in a string
  - `findIndex`: Find the index position of a substring in a string
  - `insertAfter`: Insert a new string after a specified position or substring
  - `insertBefore`: Insert a new string before a specified position or substring
  - `lowercaseFirstLetter`: Lowercase the first letter of a string
  - `padEnd`: Pad a string with specified characters at the end to a specified length
  - `padStart`: Pad a string with specified characters at the start to a specified length
  - `removeAfter`: Remove all characters after a specified position or substring
  - `removeAt`: Remove the character at a specified position
  - `removeBefore`: Remove all characters before a specified position or substring
  - `repeat`: Repeat a string a specified number of times
  - `replaceAll`: Replace all matching substrings in a string
  - `reverse`: Reverse a string
  - `substring`: Extract a substring from a string
  - `toCamelCase`: Convert a string to camel case
  - `toKebabCase`: Convert a string to kebab case (with hyphens)
  - `toLowerAt`: Convert the character at a specified position to lowercase
  - `toLowerCase`: Convert an entire string to lowercase
  - `toPascalCase`: Convert a string to Pascal case
  - `toSnakeCase`: Convert a string to snake case (with underscores)
  - `toTitleCase`: Convert a string to title case (capitalize the first letter of each word)
  - `toUpperAt`: Convert the character at a specified position to uppercase
  - `toUpperCase`: Convert an entire string to uppercase
  - `trim`: Remove whitespace from both ends of a string
  - `trimEnd`: Remove whitespace from the end of a string
  - `trimStart`: Remove whitespace from the start of a string
  - `words`: Split a string into an array of words
  
- Regular Expression Module,Includes:
  - Import the main `regex` instance as a unified entry point.
  - Support `checker(input)` to create a validator, which can chain plugin rules for validation.
  - Support `replacer(input)` to create a replacer for replacement via rules or regular expressions.
  - Object Utilities Module,Includes:
  - `hasOwn`: Check if an object has a specified own property
  - `keys`: Return an array of an object’s own enumerable property keys
  - `merge` and `mergeDeep`: Merge objects (with `mergeDeep` supporting deep merging)
  - `omit` and `omitBy`: Exclude specified properties or properties satisfying conditions from an object
  - `pick` and `pickBy`: Select specified properties or properties satisfying conditions from an object
  - `values`: Return an array of an object’s own enumerable property values
  
- General Utilities Module,Includes:
  - `clone`: Shallow copy multiple JavaScript types (arrays, dates, regular expressions, Map, Set, typed arrays, DataViews, and plain objects)
  - `cloneWith`: Shallow copy using a custom function
  - `cloneDeep`: Deep copy objects, arrays, Map, Set, dates, and regular expressions, with support for handling circular references
  - `cloneDeepWith`: Deep copy using a custom function
  - `includes`: Check if a value exists in an array, string, object, Map, or Set
  
- Array Operation Module,Includes:
  - `at`: Get an element from an array by positive index or negative index (negative index counts from the end of the array)
  - `intersect`: Get the intersection of two arrays, returning a new array with common elements
  - `remove`: Remove specified values from an array, returning a new array without them
  - `union`: Get the union of two arrays, returning a new array with all unique elements
  - `unique`: Remove duplicate values from an array, returning a new array with only unique values



## 0.0.1-alpha.0

*2025-05-15*

### ♻️ Refactors

- Refactored the type module’s type-checking utilities with the following improvements
	- Added `isArray`: Check if a value is an array  
	- Added `isArrayBuffer`: Check if a value is an ArrayBuffer  
	- Added `isBlob`: Check if a value is a Blob  
	- Added `isBoolean`: Check if a value is a boolean  
	- Added `isBuffer`: Check if a value is a Node.js Buffer  
	- Added `isDataView`: Check if a value is a DataView  
	- Added `isDate`: Check if a value is a Date object  
	- Added `isEmpty`: Check if a value is empty (e.g., empty array, object, or string)  
	- Added `isEqual`: Deeply compare two values for equality  
	- Added `isFunction`: Check if a value is a function  
	- Added `isMap`: Check if a value is a Map  
	- Added `isWeakMap`: Check if a value is a WeakMap  
	- Added `isNodeJS`: Check if the environment is Node.js  
	- Added `isNull`: Check if a value is null  
	- Added `isNil`: Check if a value is null or undefined  
	- Added `isNumber`: Check if a value is a number  
	- Added `isInt`: Check if a value is an integer  
	- Added `isBigInt`: Check if a value is a BigInt  
	- Added `isFloat`: Check if a value is a float  
	- Added `isNaN`: Check if a value is NaN  
	- Added `isObject`: Check if a value is an object (excluding null)  
	- Added `isObjectLike`: Check if a value is object-like (non-null and typeof === "object")  
	- Added `isPlainObject`: Check if a value is a plain object (created by {} or Object)  
	- Added `isPrimitive`: Check if a value is a primitive (e.g., string, number, boolean, etc.)  
	- Added `isPromise`: Check if a value is a Promise  
	- Added `isRegExp`: Check if a value is a regular expression  
	- Added `isSet`: Check if a value is a Set  
	- Added `isWeakSet`: Check if a value is a WeakSet  
	- Added `isString`: Check if a value is a string  
	- Added `isSymbol`: Check if a value is a Symbol  
	- Added `isTypedArray`: Check if a value is a TypedArray (e.g., Uint8Array, Float32Array, etc.)  
	- Added `isUndefined`: Check if a value is undefined  
	- Added `typeOf`: Get the precise type string


