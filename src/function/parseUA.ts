export interface ParsedUA {
  browser: {
    name: string | null;
    version: string | null;
    majorVersion?: string | null; // 主要版本号，方便快速判断
  };
  os: {
    name: string | null;
    version: string | null;
    majorVersion?: string | null;
  };
  device: {
    type: "Mobile" | "Tablet" | "Desktop" | "SmartTV" | "Console" | "Wearable" | "Unknown";
    model: string | null;
    vendor?: string | null;
  };
  engine: {
    name: string | null;
    version: string | null;
  };
  originalUA: string;
}

const BROWSER_REGEXES: { name: string; regex: RegExp }[] = [
  { name: "Edge (Chromium)", regex: /Edg\/([\d.]+)/ },
  { name: "Edge (Legacy)", regex: /Edge\/([\d.]+)/ },
  { name: "Opera", regex: /OPR\/([\d.]+)/ },
  { name: "Vivaldi", regex: /Vivaldi\/([\d.]+)/ },
  { name: "Chrome", regex: /Chrome\/([\d.]+)/ },
  { name: "Firefox", regex: /Firefox\/([\d.]+)/ },
  { name: "Safari", regex: /Version\/([\d.]+).*Safari/ },
  { name: "Internet Explorer", regex: /MSIE ([\d.]+);/ },
  { name: "Internet Explorer", regex: /Trident\/7.0.*rv:([\d.]+)/ },
  { name: "Samsung Internet", regex: /SamsungBrowser\/([\d.]+)/ },
];

const OS_REGEXES: { name: string; regex: RegExp; versionReplace?: RegExp }[] = [
  { name: "Windows", regex: /Windows NT ([\d.]+)/ },
  { name: "macOS", regex: /Mac OS X ([\d_]+)/, versionReplace: /_/g },
  { name: "iOS", regex: /\(iP(?:hone|ad|od); CPU (?:iPhone )?OS ([\d_]+)/, versionReplace: /_/g },
  { name: "Android", regex: /Android ([\d.]+)/ },
  { name: "Linux", regex: /Linux/ }, // Linux 通常无版本号
  { name: "Chrome OS", regex: /CrOS [\w\d_]+ ([\d.]+)/ },
  { name: "Windows Phone", regex: /Windows Phone ([\d.]+)/ },
];

const DEVICE_REGEXES: { type: ParsedUA["device"]["type"]; regex: RegExp; modelCaptureIndex?: number }[] = [
  { type: "Mobile", regex: /Mobile|iPhone|Android/ },
  { type: "Tablet", regex: /Tablet|iPad/ },
  { type: "SmartTV", regex: /SmartTV|SMART-TV|Smart-TV|NetCast.TV|AppleTV|Roku/ },
  { type: "Console", regex: /Xbox|PlayStation/ },
  { type: "Wearable", regex: /Watch|Wearable/ },
];

const ENGINE_REGEXES: { name: string; regex: RegExp }[] = [
  { name: "Blink", regex: /Chrome\/([\d.]+)/ },       // Chrome 内核（Blink）推测
  { name: "WebKit", regex: /AppleWebKit\/([\d.]+)/ }, // 真实 WebKit 版本
  { name: "Gecko", regex: /Gecko\/([\d.]+)/ },
  { name: "Trident", regex: /Trident\/([\d.]+)/ },
  { name: "EdgeHTML", regex: /EdgeHTML\/([\d.]+)/ },
];


/**
 * @description
 * Parse the UserAgent string into detailed browser, OS, device, and engine info.
 * 解析 UserAgent 字符串，返回详细的浏览器、操作系统、设备和渲染引擎信息。
 *
 * @param {string} [ua] - Optional UserAgent string, defaults to navigator.userAgent.
 *                      - 可选的 UserAgent 字符串，默认使用 navigator.userAgent。
 * @returns {ParsedUA} Parsed UserAgent details.
 *                   解析后的 UA 详细信息。
 *
 * @example
 * ```ts
 *
 * const uaInfo = parseUA();
 * console.log(uaInfo.browser.name); // e.g. 'Chrome'
 * console.log(uaInfo.os.name);      // e.g. 'Windows'
 * console.log(uaInfo.device.type);  // e.g. 'Desktop'
 * ```
 */
export function parseUA(ua?: string): ParsedUA {
  const userAgent = ua || (typeof navigator !== "undefined" ? navigator.userAgent : "");

  const result: ParsedUA = {
    browser: { name: null, version: null, majorVersion: null },
    os: { name: null, version: null, majorVersion: null },
    device: { type: "Unknown", model: null, vendor: null },
    engine: { name: null, version: null },
    originalUA: userAgent,
  };

  // -------- browser 浏览器 -----------
  for (const { name, regex } of BROWSER_REGEXES) {
    const match = userAgent.match(regex);
    if (match) {
      const version = match[1];
      result.browser = {
        name,
        version,
        majorVersion: version?.split(".")[0] ?? null,
      };
      break;
    }
  }

  // -------- os 操作系统 -----------
  for (const { name, regex, versionReplace } of OS_REGEXES) {
    const match = userAgent.match(regex);
    if (match) {
      let version = match[1] || null;
      if (version && versionReplace) version = version.replace(versionReplace, ".");
      result.os = {
        name,
        version,
        majorVersion: version?.split(".")[0] ?? null,
      };
      break;
    }
  }

  // -------- engine 渲染引擎 -----------
  for (const { name, regex } of ENGINE_REGEXES) {
    const match = userAgent.match(regex);
    if (match) {
      result.engine = {
        name,
        version: match[1] || null,
      };
      break;
    }
  }

  // -------- device 设备类型 -----------
  for (const { type, regex } of DEVICE_REGEXES) {
    if (regex.test(userAgent)) {
      result.device.type = type;
      if (/iPhone/.test(userAgent)) result.device.model = "iPhone";
      else if (/iPad/.test(userAgent)) result.device.model = "iPad";
      else if (/Android/.test(userAgent)) result.device.model = "Android Device";
      break;
    }
  }

  if (result.device.type === "Unknown") {
    result.device.type = "Desktop";
  }

  return result;
}