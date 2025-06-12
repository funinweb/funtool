/**
 * Serializes a flat object into a query string with URL encoding.
 * 将扁平对象序列化为查询字符串，并进行 URL 编码。
 *
 * @param obj - The flat object to serialize. 要序列化的扁平对象。
 * @returns A URL-safe query string. 返回 URL 安全的查询字符串。
 *
 * @example
 * parseQuery({ name: "Tom", age: 20 });
 * // => "name=Tom&age=20"
 *
 * @example
 * parseQuery({ city: "北京", lang: "zh-CN" });
 * // => "city=%E5%8C%97%E4%BA%AC&lang=zh-CN"
 */
export const parseQuery = (obj: Record<string | number, any>): string => {
  if (typeof obj !== "object" || obj == null) return "";

  return Object.keys(obj)
    .map((key) => {
      const val = obj[key];
      if (val == null) return "";
      return `${encodeURIComponent(key)}=${encodeURIComponent(val)}`;
    })
    .filter(Boolean)
    .join("&");
};

/**
 * Serializes an object into a query string using a custom serializer function.
 * 使用自定义序列化函数将对象转换为查询字符串。
 *
 * @param obj - The object to serialize. 要序列化的对象。
 * @param serializer - Function to serialize each key-value pair. 自定义序列化函数。
 * @returns A serialized query string. 返回序列化后的查询字符串。
 *
 * @example
 * parseQueryWith({ a: 1, b: null, c: "test" }, (key, value) => {
 *   if (value == null) return null;
 *   return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
 * });
 * // => "a=1&c=test"
 */
export const parseQueryWith = (
  obj: Record<string, any>,
  serializer: (key: string, value: any) => string | null
): string => {
  if (typeof obj !== "object" || obj == null) return "";

  return Object.entries(obj)
    .map(([key, value]) => serializer(key, value))
    .filter((v): v is string => typeof v === "string")
    .join("&");
};