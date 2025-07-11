const NativeMath = globalThis.Math;
/**
 * MathX: Flexible math tool with chainable APIs.
 * MathX 工具类：提供灵活的数学自定义的精度和舍入方式进行精确计算功能，支持链式调用。
 */
export class MathX {
	private _value: number
	private _precision: number
	private _rounding: "half-up" | "up" | "down"

	/**
	 * Constructor.
	 * 构造函数。
	 * @param value - Initial value. 初始值。
	 * @param precision - Decimal places. 小数位数。
	 * @param rounding - Rounding mode. 舍入模式。
	 * @example
	 * const mx = new MathX(1.2345, 2, 'half-up');
	 */
	constructor(value = 0, precision = 2, rounding: "half-up" | "up" | "down" = "half-up") {
		this._precision = precision
		this._rounding = rounding
		this._value = value //this._round(value);
	}

	/**
	 * Set value.
	 * 设置值。
	 * @param value - New value. 新值。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(5);
	 */
	set(value: number): this {
		this._value = this._round(value)
		return this
	}

	/**
	 * Get current value.
	 * 获取当前值。
	 * @returns Current value. 当前值。
	 * @example
	 * mx.value(); // => 5
	 */
	value(): number {
		return this._round(this._value)
	}

	/**
	 * Set precision.
	 * 设置小数位数。
	 * @param digits - Number of decimal places. 小数位数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.setPrecision(3);
	 */
	setPrecision(digits: number): this {
		this._precision = digits
		return this
	}

	/**
	 * Set rounding mode.
	 * 设置舍入模式。
	 * @param mode - Rounding mode ('half-up', 'up', 'down'). 舍入模式（'half-up'、'up'、'down'）。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.setRounding('up');
	 */
	setRounding(mode: "half-up" | "up" | "down"): this {
		this._rounding = mode
		return this
	}

	/**
	 * Clone current instance.
	 * 克隆当前实例。
	 * @param value - Optional new value. 可选新值。
	 * @returns New MathX instance. 新的 MathX 实例。
	 * @example
	 * const clone = mx.clone(10);
	 */
	clone(value?: number): MathX {
		return new MathX(value ?? this._value, this._precision, this._rounding)
	}

	/**
	 * Round helper (internal).
	 * 内部舍入辅助函数。
	 * @param val - Value to round. 需要舍入的值。
	 * @returns Rounded value. 舍入后的值。
	 */
	private _round(val: number): number {
		if (!isFinite(val)) {
			return val
		}
		if (NativeMath.abs(val) >= 1e15) {
			// Use string-based rounding for very large numbers
			const str = val.toExponential()
			const [numStr, expStr] = str.split("e")
			const roundedNum = Number(Number(numStr).toFixed(this._precision))
			return Number(`${roundedNum}e${expStr}`)
		}
		const factor = 10 ** this._precision
		switch (this._rounding) {
			case "up":
				// return (val > 0 ? NativeMath.ceil(val * factor) : NativeMath.floor(val * factor)) / factor;
				// 修复负数向上取整逻辑
				return NativeMath.ceil(val * factor) / factor
			case "down":
				// return NativeMath.trunc(val * factor) / factor;
				// 修复负数向下取整逻辑
				return NativeMath.floor(val * factor) / factor
			default:
				return NativeMath.round(val * factor) / factor
		}
	}

	/**
	 * Add number to current value.
	 * 将当前值与指定数相加。
	 *
	 * @param num - Number to add. 要相加的数。
	 * @returns Current instance for chaining. 返回当前实例，可继续链式调用。
	 *
	 * @example
	 * const mx = new MathX(0.1).setPrecision(2).setRounding('half-up');
	 * mx.add(0.2).value(); // => 0.3
	 */
	add(num: number): this {
		this._value = this._value + num
		return this
	}

	/**
	 * Subtract number from current value.
	 * 将当前值与指定数相减。
	 *
	 * @param num - Number to subtract. 要相减的数。
	 * @returns Current instance for chaining. 返回当前实例，可继续链式调用。
	 *
	 * @example
	 * const mx = new MathX(0.3).setPrecision(2).setRounding('half-up');
	 * mx.subtract(0.1).value(); // => 0.2
	 */
	subtract(num: number): this {
		this._value = this._value - num
		return this
	}

	/**
	 * Multiply current value by number.
	 * 将当前值与指定数相乘。
	 *
	 * @param num - Number to multiply. 要相乘的数。
	 * @returns Current instance for chaining. 返回当前实例，可继续链式调用。
	 *
	 * @example
	 * const mx = new MathX(0.1).setPrecision(2).setRounding('half-up');
	 * mx.multiply(0.2).value(); // => 0.02
	 */
	multiply(num: number): this {
		this._value = this._value * num
		return this
	}

	/**
	 * Divide current value by number.
	 * 将当前值与指定数相除。
	 *
	 * @param num - Number to divide by. 除数。
	 * @returns Current instance for chaining. 返回当前实例，可继续链式调用。
	 *
	 * @example
	 * const mx = new MathX(1).setPrecision(2).setRounding('half-up');
	 * mx.divide(3).value(); // => 0.33
	 */
	divide(num: number): this {
		if (num === 0) {
			throw new Error("Division by zero is not allowed.")
		}
		this._value = this._value / num
		return this
	}

	/**
	 * Absolute value.
	 * 取绝对值。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(-5).abs().value(); // => 5
	 */
	abs(): this {
		this._value = NativeMath.abs(this._value)
		return this
	}

	/**
	 * Square root.
	 * 开平方。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(9).sqrt().value(); // => 3
	 */
	sqrt(): this {
		if (this._value < 0) {
			throw new Error("Square root of negative numbers is not supported.")
		}
		this._value = NativeMath.sqrt(this._value)
		return this
	}

	/**
	 * Cube root.
	 * 开立方根。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(8).cbrt().value(); // => 2
	 */
	cbrt(): this {
		this._value = NativeMath.cbrt(this._value)
		return this
	}

	/**
	 * Power.
	 * 幂次运算。
	 * @param exp - Exponent. 指数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(2).pow(3).value(); // => 8
	 */
	pow(exp: number): this {
		if (this._value === 1 && !isFinite(exp)) {
			this._value = 1 // 特殊情况处理
		} else {
			this._value = NativeMath.pow(this._value, exp)
		}
		return this
	}

	/**
	 * Floor.
	 * 向下取整。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(2.7).floor().value(); // => 2
	 */
	floor(): this {
		this._value = NativeMath.floor(this._value)
		return this
	}

	/**
	 * Ceil.
	 * 向上取整。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(2.3).ceil().value(); // => 3
	 */
	ceil(): this {
		this._value = NativeMath.ceil(this._value)
		return this
	}

	/**
	 * Round to nearest integer.
	 * 四舍五入到整数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(2.5).round().value(); // => 3
	 */
	round(): this {
		this._value = NativeMath.round(this._value)
		return this
	}

	/**
	 * Sign function.
	 * 获取符号（-1, 0, 1）。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(-10).sign().value(); // => -1
	 */
	sign(): this {
		this._value = NativeMath.sign(this._value)
		return this
	}

	/**
	 * Convert degrees to radians.
	 * 角度转弧度。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(180).degToRad().value(); // => 3.14
	 */
	degToRad(): this {
		this._value = (this._value * NativeMath.PI) / 180
		return this
	}

	/**
	 * Convert radians to degrees.
	 * 弧度转角度。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(Math.PI).radToDeg().value(); // => 180
	 */
	radToDeg(): this {
		this._value = (this._value * 180) / NativeMath.PI
		return this
	}

	/**
	 * Max with other numbers.
	 * 与其他值比较取最大值。
	 * @param nums - Numbers to compare. 要比较的其他数字。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(5).max(3, 10).value(); // => 10
	 */
	max(...nums: number[]): this {
		this._value = NativeMath.max(this._value, ...nums)
		return this
	}

	/**
	 * Min with other numbers.
	 * 与其他值比较取最小值。
	 * @param nums - Numbers to compare. 要比较的其他数字。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(5).min(1, 3).value(); // => 1
	 */
	min(...nums: number[]): this {
		this._value = NativeMath.min(this._value, ...nums)
		return this
	}

	/**
	 * Sine.
	 * 正弦函数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(Math.PI / 2).sin().value(); // => 1
	 */
	sin(): this {
		this._value = NativeMath.sin(this._value)
		return this
	}

	/**
	 * Cosine.
	 * 余弦函数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(0).cos().value(); // => 1
	 */
	cos(): this {
		this._value = NativeMath.cos(this._value)
		return this
	}

	/**
	 * Tangent.
	 * 正切函数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(Math.PI / 4).tan().value(); // => 1
	 */
	tan(): this {
		this._value = NativeMath.tan(this._value)
		return this
	}

	/**
	 * Arcsine.
	 * 反正弦函数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(1).asin().radToDeg().value(); // => 90
	 */
	asin(): this {
		this._value = NativeMath.asin(this._value)
		return this
	}

	/**
	 * Arccosine.
	 * 反余弦函数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(0).acos().radToDeg().value(); // => 90
	 */
	acos(): this {
		this._value = NativeMath.acos(this._value)
		return this
	}

	/**
	 * Arctangent.
	 * 反正切函数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(1).atan().radToDeg().value(); // => 45
	 */
	atan(): this {
		this._value = NativeMath.atan(this._value)
		return this
	}

	/**
	 * Natural logarithm.
	 * 自然对数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(Math.E).log().value(); // => 1
	 */
	log(): this {
		this._value = NativeMath.log(this._value)
		return this
	}

	/**
	 * Base-10 logarithm.
	 * 以 10 为底的对数。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(100).log10().value(); // => 2
	 */
	log10(): this {
		this._value = NativeMath.log10(this._value)
		return this
	}

	/**
	 * Exponential function.
	 * 指数函数（以 e 为底）。
	 * @returns Current instance. 当前实例。
	 * @example
	 * mx.set(1).exp().value(); // => 2.72
	 */
	exp(): this {
		this._value = NativeMath.exp(this._value)
		return this
	}

	/**
   * Convert the current value to exponential notation string.
   * 将当前值转换为指数计数法字符串。
   * @param fractionDigits - Number of digits after the decimal point. 小数点后的位数。
   *                         If omitted, uses as many digits as necessary. 省略时自动决定。
   * @returns Exponential notation string. 指数计数法字符串。
   * @example
   * const mx = new MathX(12345);
   * console.log(mx.toExponential());       // e.g. "1.2345e+4"
   * console.log(mx.toExponential(2));      // e.g. "1.23e+4"
   */
  toExponential(fractionDigits?: number): string {
    if (fractionDigits === undefined) {
      return this._value.toExponential();
    } else {
      return this._value.toExponential(fractionDigits);
    }
  }
}
