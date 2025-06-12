export interface StringifyURLOptions {
  protocol?: string;
  hostname: string;
  port?: string;
  pathname?: string;
  query?: Record<string, any>;
  hash?: string;
}
/**
 * Converts a structured URL object into a URL string.
 * 将结构化 URL 对象转换为 URL 字符串。
 *
 * @param {StringifyURLOptions} options - URL components to stringify. 要序列化的 URL 组件。
 * @param {string} [options.protocol] - The protocol (e.g. "https"). 协议（如 https）。
 * @param {string} options.hostname - The hostname. 主机名。
 * @param {string} [options.port] - The port number. 端口号。
 * @param {string} [options.pathname="/"] - The path. 路径，默认为 `/`。
 * @param {Record<string, any>} [options.query] - Query parameters as key-value pairs. 查询参数。
 * @param {string} [options.hash] - The hash part (e.g. "#top"). 哈希锚点（如 #top）。
 * @returns {string} The full URL string. 序列化后的完整 URL 字符串。
 *
 * @example
 * urlStringify({
 *   protocol: "https",
 *   hostname: "example.com",
 *   port: "8080",
 *   pathname: "/path",
 *   query: { a: 1, b: true, c: "", d: ["x", "y"] },
 *   hash: "top"
 * });
 * // => "https://example.com:8080/path?a=1&b=true&c=&d=x&d=y#top"
 */
export function urlStringify(options: StringifyURLOptions): string {
  const {
    protocol = "",
    hostname,
    port = "",
    pathname = "/",
    query = {},
    hash = "",
  } = options;

  const proto = protocol ? (protocol.endsWith(":") ? protocol : `${protocol}:`) : "";
  const host = port ? `${hostname}:${port}` : hostname;
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;

  const queryString = Object.entries(query)
    .flatMap(([key, value]) => {
      if (!key || value === undefined || value === null) return [];

      const encode = (v: any) => encodeURIComponent(
        typeof v === "boolean" ? String(v) : String(v)
      );

      if (Array.isArray(value)) {
        return value.map(v => `${encodeURIComponent(key)}=${encode(v)}`);
      }

      return `${encodeURIComponent(key)}=${encode(value)}`;
    })
    .join("&");

  const search = queryString ? `?${queryString}` : "";
  const hashPart = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "";

  return `${proto}//${host}${path}${search}${hashPart}`;
};
