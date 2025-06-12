/**
 * Generate a 24-character hex string simulating MongoDB ObjectId.
 * 生成一个模拟 MongoDB ObjectId 的 24 位十六进制字符串。
 * @param randomFn Custom random function (default: Math.random)
 *                 自定义随机函数（默认：Math.random）
 */
function generateHex(randomFn: () => number = Math.random): string {
  const timestamp = Math.floor(Date.now() / 1000).toString(16).padStart(8, "0");
  const random = Array.from({ length: 16 }, () =>
    Math.floor(randomFn() * 16).toString(16)
  ).join("");
  return (timestamp + random).slice(0, 24);
}

/**
 * A lightweight ObjectId implementation supporting hex, UUID, base64, and prefix.
 * 轻量级 ObjectId 实现，支持 hex、UUID、base64、前缀等格式。
 */
export class ObjectId {
  private hex: string;

  /**
   * Create a new ObjectId instance.
   * 创建一个新的 ObjectId 实例。
   * @param hex Optional hex string. If provided, it must be valid.
   *            可选 hex 字符串。如果提供，必须合法。
   * @param randomFn Optional custom random function.
   *                 可选的自定义随机函数。
   */
  constructor(hex?: string, randomFn?: () => number) {
    if (hex) {
      if (!ObjectId.isValid(hex)) {
        throw new Error("Invalid ObjectId hex string.");
      }
      this.hex = hex.toLowerCase();
    } else {
      this.hex = generateHex(randomFn);
    }
  }

  /**
   * Validate a hex string.
   * 验证一个十六进制字符串是否合法。
   * @param hex The hex string to validate. 要验证的十六进制字符串。
   */
  static isValid(hex: string): boolean {
    return typeof hex === "string" && /^[a-fA-F0-9]{24}$/.test(hex);
  }

  /**
   * Create an ObjectId from a valid hex string.
   * 从合法的 hex 字符串创建 ObjectId。
   * @param hex A valid 24-character hex string. 合法的 24 位十六进制字符串。
   */
  static createFromHexString(hex: string): ObjectId {
    return new ObjectId(hex);
  }

  /**
   * Create an ObjectId string with prefix.
   * 创建带前缀的 ObjectId 字符串。
   * @param prefix The prefix string. 前缀字符串。
   */
  static createWithPrefix(prefix: string): string {
    return prefix + new ObjectId().toHexString();
  }

  /**
   * Return the hex string.
   * 返回 hex 字符串。
   */
  toHex(): string {
    return this.hex;
  }

  /**
   * Convert to Uint8Array buffer.
   * 转换为 Uint8Array 缓冲区。
   */
  toBuffer(): Uint8Array {
    const buf = new Uint8Array(12);
    for (let i = 0; i < 12; i++) {
      buf[i] = parseInt(this.hex.slice(i * 2, i * 2 + 2), 16);
    }
    return buf;
  }

  /**
   * Check equality with another ObjectId.
   * 判断是否与另一个 ObjectId 相等。
   */
  equals(other: ObjectId): boolean {
    return this.hex === other.hex;
  }

  /**
   * Parse ObjectId from mixed-format string.
   * 从混合格式字符串解析 ObjectId。
   * @param str Any string containing valid hex. 包含合法 hex 的任意字符串。
   * @param strict - Whether to strictly validate full format. 是否严格校验格式。
   * @example
   * ObjectId.parse("uuid-5f1d7f3b1c9d440000000000").toHex(); // => "5f1d7f3b1c9d440000000000"
   */
  static parse(str: string, strict:boolean = false): ObjectId {
    if (strict) {
      if (!ObjectId.isValid(str)) throw new Error(`Invalid strict ObjectId: ${str}`);
      return new ObjectId(str);
    }
    const match = str.match(/[a-fA-F0-9]{24}/);
    if (!match) throw new Error(`Invalid format for ObjectId: ${str}`);
    return new ObjectId(match[0]);
  }

  /**
   * Return the 24-char hex string.
   * 返回 24 位 hex 字符串。
   */
  toHexString(): string {
    return this.hex;
  }

  /**
   * Convert to UUID-like format (padded to 128 bits).
   * 转换为 UUID 风格格式（补齐为 128 位）。
   */
  toUUIDString(): string {
    const h = this.hex.padEnd(32, "0");
    return [h.slice(0, 8), h.slice(8, 12), h.slice(12, 16), h.slice(16, 20), h.slice(20)].join("-");
  }

  /**
   * Default string representation (hex).
   * 默认字符串表现形式（hex）。
   */
  toString(): string {
    return this.toHexString();
  }

  /**
   * Convert to base64 string.
   * 转换为 base64 字符串。
   */
  toBase64(): string {
    return Buffer.from(this.toBuffer()).toString("base64");
  }

  /**
   * Convert to short ID (base64 with optional prefix).
   * 转换为短 ID（base64 编码，可选前缀）。
   * @param prefix Optional prefix. 可选前缀。
   */
  short(prefix = ""): string {
    return prefix + this.toBase64().replace(/=+$/, "");
  }

  /**
   * Get timestamp in milliseconds.
   * 获取时间戳（单位：毫秒）。
   */
  getTimestamp(): number {
    return parseInt(this.hex.slice(0, 8), 16) * 1000;
  }

  /**
   * Compare with another ObjectId.
   * 与另一个 ObjectId 比较大小。
   */
  compare(other: ObjectId): number {
    return this.hex.localeCompare(other.hex);
  }

  /**
   * Clone the ObjectId.
   * 克隆当前 ObjectId。
   */
  clone(): ObjectId {
    return new ObjectId(this.hex);
  }

  /**
   * Ensure JSON.stringify outputs hex string.
   * 保证 JSON 序列化输出 hex 字符串。
   */
  toJSON(): string {
    return this.toHexString();
  }
}
