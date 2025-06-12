import { parseUA } from "./parseUA";

type BrowserType =
  | "IE7"
  | "IE8"
  | "IE9"
  | "IE10"
  | "IE11"
  | "Edge"
  | "FireFox"
  | "Opera"
  | "Chrome"
  | "Safari"
  | null;

/**
 * @description Get browser type based on parsed UA info.
 * 获取浏览器类型，基于已解析的 UA 信息。
 *
 * @returns {BrowserType} One of the browser types: 'IE7'|'IE8'|'IE9'|'IE10'|'IE11'|'Edge'|'FireFox'|'Opera'|'Chrome'|'Safari' or null.
 * 返回浏览器类型，可能值为：'IE7'|'IE8'|'IE9'|'IE10'|'IE11'|'Edge'|'FireFox'|'Opera'|'Chrome'|'Safari' 或 null。
 *
 * @example
 * ```ts
 * console.log(getBrowserType());
 * // Output: 'Chrome' (if user is on Chrome)
 * ```
 */
export function getBrowserType():BrowserType {
  const info = parseUA();

  if (!info.browser.name || !info.browser.version) return null;

  const name = info.browser.name.toLowerCase();
  const majorVersion = parseInt(info.browser.majorVersion || "0");

  switch (name) {
    case "internet explorer":
      // IE7 ~ IE11
      if (majorVersion >= 7 && majorVersion <= 10) return `IE${majorVersion}` as BrowserType;
      if (majorVersion === 11) return "IE11";
      return null;
    case "edge (chromium)":
    case "edge (legacy)":
      return "Edge";
    case "firefox":
      return "FireFox";
    case "opera":
      return "Opera";
    case "chrome":
      return "Chrome";
    case "safari":
      return "Safari";
    default:
      return null;
  }
}