/**
 * Serializes a deeply nested object into a query string, supporting objects and arrays.
 * 深度序列化嵌套对象为查询字符串，支持对象与数组。
 *
 * @param obj - The object to serialize. 要序列化的对象。
 * @returns A URL-safe query string. 返回 URL 安全的查询字符串。
 *
 * @example
 * parseQueryDeep({
 *   user: { name: "Tom", age: 20 },
 *   tags: ["ts", "js"],
 *   q: "hello"
 * });
 * // => "user[name]=Tom&user[age]=20&tags[]=ts&tags[]=js&q=hello"
 */
export const parseQueryDeep = (obj: Record<string, any>): string => {
  const build = (value: any, keyPath: string): string[] => {
    if (value == null) return [];

    if (typeof value === "object" && !Array.isArray(value)) {
      return Object.keys(value).flatMap((key) =>
        build(value[key], `${keyPath}[${encodeURIComponent(key)}]`)
      );
    }

    if (Array.isArray(value)) {
      return value.flatMap((item) =>
        build(item, `${keyPath}[]`)
      );
    }

    return [`${keyPath}=${encodeURIComponent(String(value))}`];
  };

  if (typeof obj !== "object" || obj == null) return "";

  return Object.keys(obj)
    .flatMap((key) => build(obj[key], encodeURIComponent(key)))
    .join("&");
};


/**
 * Serializes a deeply nested object into a query string,
 * allowing customization of key path structure via `pathBuilder`.
 * 
 * 使用自定义 pathBuilder 将嵌套对象序列化为查询字符串，灵活控制键路径格式（如 user.name / user_name / user[name]）。
 *
 * @param obj - The nested object to serialize. 要序列化的嵌套对象。
 * @param pathBuilder - Builds the final key string from path segments.
 *                      用于构建键路径字符串的自定义函数。
 * @returns A URL-encoded query string. 返回编码后的查询字符串。
 *
 * @example
 * parseQueryDeepWith({ user: { name: "Tom" }, tags: ["ts", "js"] }, path => path.join("."));
 * // => "user.name=Tom&tags.0=ts&tags.1=js"
 *
 * @example
 * parseQueryDeepWith({ user: { name: "Tom" } }, path => path.join("_"));
 * // => "user_name=Tom"
 *
 * @example
 * parseQueryDeepWith({ user: { name: "Tom" } }, (path) => {
 *   const [first, ...rest] = path;
 *   return first + rest.map(k => `[${k}]`).join('');
 * });
 * // => "user[name]=Tom"
 */
export const parseQueryDeepWith = (
  obj: Record<string, any>,
  pathBuilder: (path: string[]) => string
): string => {
  const build = (value: any, path: string[]): string[] => {
    if (value == null) return [];

    if (typeof value === "object" && !Array.isArray(value)) {
      return Object.keys(value).flatMap((key) =>
        build(value[key], [...path, key])
      );
    }

    if (Array.isArray(value)) {
      return value.flatMap((item, index) =>
        build(item, [...path, String(index)])
      );
    }

    const key = pathBuilder(path.map(encodeURIComponent));
    const val = encodeURIComponent(String(value));
    return [`${key}=${val}`];
  };

  if (typeof obj !== "object" || obj == null) return "";

  return Object.keys(obj)
    .flatMap((key) => build(obj[key], [key]))
    .join("&");
};
