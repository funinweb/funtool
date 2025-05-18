# 🧰 funtool - A Modern Modular Utility Library
## 1. Introduction
`funtool` is a modern, modular JavaScript utility library designed to boost developer productivity. It offers well-organized modules, full TypeScript support, and an automated documentation system, making it suitable for multilingual projects, web applications, Node.js environments, and more. This project is a complete refactor of an older utility library, with versioning reset. Written in TypeScript, it features a cleaner structure, enhanced flexibility, and a more robust documentation system. `funtool` provides type-safe, reusable utility functions that significantly improve development efficiency for both JavaScript and TypeScript projects.

## 2. Features
+ 🚀 **Boost Productivity**: Standardizes common logic to avoid reinventing the wheel, letting developers focus on core business logic.
+ 🌈 **Modular Design**: Import only what you need—such as `array`, `object`, `string`, or `type` modules—to keep bundle size minimal.
+ 🔍 **Type Safety**: Built with TypeScript, offering comprehensive type declarations and seamless IDE integration for a smoother development experience.
+ 🧪 **Robust Test Coverage**: High test coverage ensures the library's reliability and stability.
+ 🧱 **Progressive Integration**: Use it fully or integrate specific modules on demand.
+ 🔧 **Automated Release Workflow**: Supports semantic versioning, changelog generation, pre-releases, dry runs, and more.

## 3. Getting Started
### Installation
```bash
npm install funtool
# or
pnpm add funtool
```

## 4. Usage Examples
### Type Checking
```ts
import { isString } from 'funtool/type';
import { isNumber } from 'funtool';

console.log(isNumber(1)); // ✅ true
console.log(isString('hello')); // ✅ true
```

### Array Utilities
```ts
import { chunk } from 'funtool/array';

const array = [1, 2, 3, 4, 5];
console.log(chunk(array, 2)); // [[1, 2], [3, 4], [5]]
```

## 5. Module Structure
```plain
src/
├── array/           # Array utilities
├── common/          # Common/shared utilities
├── function/        # Function-related utilities
├── object/          # Object utilities
├── string/          # String utilities
├── type/            # Type checking utilities
├── version.ts       # Version information
└── index.ts         # Main entry point
```

## 6. Build & Release
### Start Development
```bash
npm run dev
```

### Build the Project
```bash
npm run build
```

### Run Tests
```bash
npm run test
```

### Generate Modules (No manual import needed)
```bash
npm run generate:module
```

### Release a New Version
```bash
pnpm run release
```

## 8. License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present xiaoqiujun

