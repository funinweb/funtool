# 更新日志

`funtool` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：发布一个带有新特性功能迭代。
- 主版本号：含有破坏性更新和新特性。

---

## 1.0.0-rc.0

*2025-05-26*

### ♻️ 代码重构

- 字符串操作模块，方便用户进行各种字符串操作，具体包括：
  - `capitalizeFirstLetter`：将字符串的首字母大写
  - `count`：统计字符串中特定子字符串的出现次数
  - `findIndex`：查找子字符串在字符串中的索引位置
  - `insertAfter`：在指定位置或子字符串后插入新的字符串
  - `insertBefore`：在指定位置或子字符串前插入新的字符串
  - `lowercaseFirstLetter`：将字符串的首字母小写
  - `padEnd`：在字符串末尾填充指定字符至指定长度
  - `padStart`：在字符串开头填充指定字符至指定长度
  - `removeAfter`：移除指定位置或子字符串之后的所有字符
  - `removeAt`：移除指定位置的字符
  - `removeBefore`：移除指定位置或子字符串之前的所有字符
  - `repeat`：重复字符串指定次数
  - `replaceAll`：替换字符串中所有匹配的子字符串
  - `reverse`：反转字符串
  - `substring`：提取字符串的子字符串
  - `toCamelCase`：将字符串转换为驼峰命名法
  - `toKebabCase`：将字符串转换为短横线命名法
  - `toLowerAt`：将指定位置的字符转换为小写
  - `toLowerCase`：将字符串转换为小写
  - `toPascalCase`：将字符串转换为帕斯卡命名法
  - `toSnakeCase`：将字符串转换为蛇形命名法
  - `toTitleCase`：将字符串转换为标题格式
  - `toUpperAt`：将指定位置的字符转换为大写
  - `toUpperCase`：将字符串转换为大写
  - `trim`：移除字符串首尾的空白字符
  - `trimEnd`：移除字符串末尾的空白字符
  - `trimStart`：移除字符串开头的空白字符
  - `words`：将字符串拆分为单词数组
  
- 正则模块，具体包括：
  - 引入 `regex` 主实例，提供统一入口。
  - 支持 `checker(input)` 创建校验器，可链式调用插件规则进行校验。
  - 支持 `replacer(input)` 创建替换器，通过规则或正则进行替换。
  
- 对象工具模块，具体包括：
  - `hasOwn`：用于检查对象是否拥有指定属性。
  - `keys`：返回对象自身的可枚举属性键。
  - `merge` 和 `mergeDeep`：用于合并对象，`mergeDeep` 支持深度合并。
  - `omit` 和 `omitBy`：用于从对象中排除指定属性或满足条件的属性。
  - `pick` 和 `pickBy`：用于从对象中选取指定属性或满足条件的属性。
  - `values`：返回对象自身的可枚举属性值。
  
- 通用模块，具体包括：
  - `clone`：用于对多种 JavaScript 类型（包括数组、日期、正则表达式、Map、Set、类型化数组、数据视图和普通对象）进行浅拷贝
  - `cloneWith`：可使用自定义函数进行浅拷贝
  - `cloneDeep`：用于对对象、数组、Map、Set、日期和正则表达式进行深拷贝，同时支持处理循环引用
  - `cloneDeepWith`：可使用自定义函数进行深拷贝
  - `includes`：支持检查值是否存在于数组、字符串、对象、Map 或 Set 中
  
- 数组操作模块，具体包括：
  - `at`：支持通过正索引或负索引获取数组中的元素，负索引表示从数组末尾开始计数
  - `intersect`：用于获取两个数组的交集，返回一个包含两个数组中共同元素的新数组
  - `remove`：从数组中移除指定的值，返回一个移除了指定值的新数组
  - `union`：获取两个数组的并集，返回一个包含两个数组所有元素且无重复的新数组
  - `unique`：移除数组中的重复值，返回一个只包含唯一值的新数组


## 0.0.1-alpha.0

*2025-05-15*

### ♻️ 代码重构

- 重构 type 模块的类型判断功能，具体改动如下
	- 新增 `isArray`：判断是否为数组  
	- 新增 `isArrayBuffer`：判断是否为 ArrayBuffer 对象  
	- 新增 `isBlob`：判断是否为 Blob 对象  
	- 新增 `isBoolean`：判断是否为布尔值  
	- 新增 `isBuffer`：判断是否为 Node.js Buffer 对象  
	- 新增 `isDataView`：判断是否为 DataView 对象  
	- 新增 `isDate`：判断是否为 Date 对象  
	- 新增 `isEmpty`：判断值是否为空（如空数组、空对象、空字符串等）  
	- 新增 `isEqual`：深度比较两个值是否相等  
	- 新增 `isFunction`：判断是否为函数  
	- 新增 `isMap`：判断是否为 Map 对象  
	- 新增 `isWeakMap`：判断是否为 WeakMap 对象  
	- 新增 `isNodeJS`：判断当前环境是否为 Node.js  
	- 新增 `isNull`：判断是否为 null  
	- 新增 `isNil`：判断是否为 null 或 undefined  
	- 新增 `isNumber`：判断是否为数字类型  
	- 新增 `isInt`：判断是否为整数  
	- 新增 `isBigInt`：判断是否为 BigInt 类型  
	- 新增 `isFloat`：判断是否为浮点数  
	- 新增 `isNaN`：判断是否为 NaN  
	- 新增 `isObject`：判断是否为对象（不包括 null）  
	- 新增 `isObjectLike`：判断是否为类对象（非 null 且 typeof 为 "object"）  
	- 新增 `isPlainObject`：判断是否为普通对象（由 {} 或 Object 创建）  
	- 新增 `isPrimitive`：判断是否为原始类型值（如 string、number、boolean 等）  
	- 新增 `isPromise`：判断是否为 Promise 实例  
	- 新增 `isRegExp`：判断是否为正则表达式对象  
	- 新增 `isSet`：判断是否为 Set 对象  
	- 新增 `isWeakSet`：判断是否为 WeakSet 对象  
	- 新增 `isString`：判断是否为字符串  
	- 新增 `isSymbol`：判断是否为 Symbol 类型  
	- 新增 `isTypedArray`：判断是否为 TypedArray 类型（如 Uint8Array、Float32Array 等）  
	- 新增 `isUndefined`：判断是否为 undefined  
	- 新增 `typeOf`：获取精确类型字符串


