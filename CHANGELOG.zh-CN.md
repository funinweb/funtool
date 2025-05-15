# 更新日志

`funtool` 严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

#### 发布周期

- 修订版本号：进行日常 bugfix 更新。（如果有紧急的 bugfix，则任何时候都可发布）
- 次版本号：发布一个带有新特性功能迭代。
- 主版本号：含有破坏性更新和新特性。

---

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


