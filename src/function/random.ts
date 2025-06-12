/**
 * Generate a random integer between lower (inclusive) and upper (exclusive).
 * 在 lower（含）和 upper（不含）之间生成一个随机整数。
 *
 * @param {number} [lower=0] - The lower bound (inclusive). 最小值（包含）。
 * @param {number} [upper=1] - The upper bound (exclusive). 最大值（不包含）。
 * @returns {number} A random integer between lower and upper. 返回一个随机整数。
 *
 * @example
 * ```ts
 * randomInt(1, 5); // Possible values: 1, 2, 3, 4
 * ```
 */
export function randomInt(lower: number = 0, upper: number = 1): number {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}

/**
 * Generate a random float between lower (inclusive) and upper (exclusive).
 * 在 lower（含）和 upper（不含）之间生成一个随机浮点数。
 *
 * @param {number} [lower=0] - The lower bound (inclusive). 最小值（包含）。
 * @param {number} [upper=1] - The upper bound (exclusive). 最大值（不包含）。
 * @returns {number} A random float between lower and upper. 返回一个随机浮点数。
 *
 * @example
 * ```ts
 * randomFloat(1.5, 5.5); // Possible: 2.347, 3.98, etc.
 * ```
 */
export function randomFloat(lower: number = 0, upper: number = 1): number {
  return Math.random() * (upper - lower) + lower;
}
