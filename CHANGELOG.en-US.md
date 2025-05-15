# Changelog

`funtool` strictly follows [Semantic Versioning 2.0.0](https://semver.org/) specification.

#### Release Schedule

- Patch version: bugfix updates (can be released anytime for urgent bugs).
- Minor version: new feature iterations.
- Major version: breaking changes and new features.

---

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


