/**
 * Generate a random verification code string of specified length, with optional custom charset
 * and the ability to exclude ambiguous characters (like 0/O/1/l).
 * 生成指定长度的随机验证码字符串，可自定义字符集，并支持排除易混淆字符（如 0/O/1/l）。
 *
 * @param {number} [len=4] - Length of the code. 验证码长度，默认 4。
 * @param {Object} [options] - Optional config. 可选配置项。
 * @param {string} [options.charset] - Custom charset. 自定义字符集。
 * @param {boolean} [options.excludeConfusing=true] - Whether to exclude confusing characters. 是否排除易混淆字符，默认 true。
 * @returns {string} Randomly generated verification code. 返回生成的验证码字符串。
 *
 * @example
 * ```ts
 * generateVerificationCode();                      // e.g., 'a8Z3'
 * generateVerificationCode(6);                     // e.g., 'X2a9Lb'
 * generateVerificationCode(6, { charset: "ABC123" }); // e.g., '1CBAC3'
 * generateVerificationCode(6, { excludeConfusing: true }); // e.g., 'x7KpT9'（排除了 0/O/l/1）
 * ```
 */
export function generateVerificationCode(
  len: number = 4,
  options?: {
    charset?: string;
    excludeConfusing?: boolean;
  }
): string {
  if (len <= 0) return "";

  const DEFAULT_CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const CONFUSING_CHARS = /[0Ool1]/g;

  let charset = options?.charset || DEFAULT_CHARSET;

  if (options?.excludeConfusing !== false) {
    charset = charset.replace(CONFUSING_CHARS, "");
  }

  if (!charset) {
    throw new Error("Character set is empty after removing confusing characters.");
  }

  return Array.from({ length: len }, () => {
    const index = Math.floor(Math.random() * charset.length);
    return charset.charAt(index);
  }).join("");
}
