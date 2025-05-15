# funtool

funtool 是一个模块化的 JavaScript 实用工具库，旨在提高开发效率。它封装了数组、对象、字符串等原生功能，提供了简单易用的 API。

## 功能模块

- [ ] **Array**: 数组操作工具
- [ ] **Object**: 对象操作工具
- [ ] **String**: 字符串操作工具
- [x] **Type**: 类型判断工具
  - isString: 判断是否为字符串
  - isNumber: 判断是否为数字
  - isBoolean: 判断是否为布尔值
  - isNull: 判断是否为null
  - isUndefined: 判断是否为undefined
  - isArray: 判断是否为数组
  - isObject: 判断是否为对象
  - isDate: 判断是否为日期
  - isFunction: 判断是否为函数
  - isSet: 判断是否为Set
  - isMap: 判断是否为Map
  - isSymbol: 判断是否为Symbol
  - isPromise: 判断是否为Promise
  - isPrimitive: 判断是否为基本类型
  - typeOf: 获取数据类型

## 安装

```bash
pnpm install funtool
```

## 使用示例

```javascript
import { isString } from 'funtool/type';

console.log(isString('hello')); // true
```

## 开发

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm run dev

# 构建
pnpm run build

# 测试
pnpm run test
```

## 贡献

欢迎提交 Pull Request。请遵循项目的编码规范和 Git 工作流。

## 许可证

MIT
