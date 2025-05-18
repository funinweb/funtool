# 🧰 funtool - 现代化模块化工具库

## 1. 项目简介

`funtool` 是一个现代化 、模块化的JavaScript 工具库，专为开发者日常开发提效而设计，提供清晰的模块划分、类型安全支持与自动化文档系统，适用于多语言项目、Web 应用、Node.js 工程等场景。该项目是对旧有工具库的全面重构，版本号已重置,采用 TypeScript 编写，结构更清晰、扩展更灵活、文档体系更完善。为 JavaScript 和 TypeScript 项目提供类型安全、可复用的工具函数，显著提升开发效率。

## 2. 特性亮点

- 🚀 **提升开发效率** ：标准化常用逻辑，避免重复造轮子，让开发者专注于核心业务。
- 🌈 **模块化设计** ：按需导入所需模块，如 array 、 object 、 string 、 type 等，有效减少包体积。
- 🔍 **类型安全**：基于 TypeScript 构建，完整类型提示支持，与 IDE 深度集成，带来更流畅的开发体验。
- 🧪 **完善测试体系**：高覆盖率的单元测试，保证稳定性。
- 🧱 **渐进式集成**：可按需引用，也可全量使用。
- 🔧 **自动化发布流程** ：支持语义化版本管理、更新日志生成、预发布版本、试运行等功能。

## 3. 快速开始

### 安装

```
npm install funtool
# 或
pnpm add funtool
```

## 4. 使用示例

### 类型判断

```
import { isString } from 'funtool/type';
import {isNumber} from 'funtool';

console.log(isNumber(1)); ✅ // true
console.log(isString('hello')); ✅ // true
```

### 数组操作

```
import { chunk } from 'funtool/array';

const array = [1, 2, 3, 4, 5];
console.log(chunk(array, 2)); // [[1, 2], [3, 4], [5]]
```

## 5. 模块结构

```
src/
├── array/          # 数组操作模块
├── common/         # 通用工具模块
├── function/       # 函数相关模块
├── object/         # 对象操作模块
├── string/         # 字符串操作模块
├── type/           # 类型判断模块
├── version.ts      # 版本信息
└── index.ts        # 入口文件
```

## 6. 构建与发布

### 开发模式

```
npm run dev
```

### 构建项目

```
npm run build
```

### 测试项目

```
npm run test
```

### 生成模块(不需要手动导入)

```
npm run generate:module
```

### 发布新版本

```
pnpm run release
```

## 8. 协议

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2019-present xiaoqiujun
