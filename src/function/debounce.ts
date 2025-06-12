export type Debounced<T extends (...args: any[]) => any, This = any> = {
	(this: This, ...args: Parameters<T>): Promise<ReturnType<T> | undefined>
	cancel: () => void
	flush: () => Promise<ReturnType<T> | undefined>
	pending: () => boolean
}
export type DebouncedSync<T extends (...args: any[]) => any, This = any> = {
	(this: This, ...args: Parameters<T>): ReturnType<T> | void
	cancel: () => void
	flush: () => ReturnType<T> | void
	pending: () => boolean
}

/**
 * Creates a debounced version of the provided function.
 * 创建一个防抖函数，延迟执行直到等待时间结束。
 *
 * @template T - The type of the function to debounce.
 * @template This - The type of the `this` context for the function.
 *
 * @param {T} fn - The original function to debounce. 原始函数。
 * @param {number} [delay=500] - The debounce delay in milliseconds. 防抖延迟，单位毫秒，默认 500。
 * @returns {Debounced<T, This>} Returns a debounced function with `cancel`, `flush`, and `pending` methods.
 * 返回防抖函数，附带取消(cancel)、立即执行(flush)和查询等待状态(pending)方法。
 *
 * @example
 * // 基本用法，普通函数
 * const debouncedLog = debounce(function(this: any, message: string) {
 *   console.log(message);
 * }, 300);
 * debouncedLog("Hello World");
 *
 * @example
 * // 在类或对象中使用，this 指向调用者
 * const obj = {
 *   prefix: "Log: ",
 *   log: debounce(function(this: typeof obj, msg: string) {
 *     console.log(this.prefix + msg);
 *   }, 200)
 * };
 * obj.log("Test"); // 输出：Log: Test
 *
 * @example
 * // 取消延迟执行
 * const fn = debounce(() => console.log("Done"), 1000);
 * fn();
 * fn.cancel(); // 取消执行
 *
 * @example
 * // 立即执行剩余任务
 * const fn2 = debounce(() => console.log("Flush!"), 1000);
 * fn2();
 * fn2.flush(); // 立即执行
 */
export function debounce<T extends (...args: any[]) => any, This = any>(
	fn: T,
	delay: number = 500
): Debounced<T, This> {
	let timeout: ReturnType<typeof setTimeout> | null = null
	let lastArgs: Parameters<T> | null = null
	let lastThis: any = null
	let pendingResolve: ((value: ReturnType<T> | PromiseLike<ReturnType<T>> | undefined) => void) | null = null
	let pendingReject: ((reason?: any) => void) | null = null

	const invoke = () => {
		if (!lastArgs) return

		try {
			const result = fn.apply(lastThis, lastArgs)
			pendingResolve?.(result)
			reset()
			return result
		} catch (err) {
			pendingReject?.(err)
			reset()
			throw err
		}
	}

	const reset = () => {
		timeout = null
		lastArgs = null
		lastThis = null
		pendingResolve = null
		pendingReject = null
	}

	function debounced(this: This, ...args: Parameters<T>): Promise<ReturnType<T> | undefined> {
		if (timeout) clearTimeout(timeout)

		lastArgs = args
		lastThis = this

		return new Promise((resolve, reject) => {
			pendingResolve = resolve
			pendingReject = reject

			timeout = setTimeout(() => {
				invoke()
			}, delay)
		})
	}

	debounced.cancel = function () {
		if (timeout) clearTimeout(timeout)
		pendingReject?.("Debounced call canceled")
		reset()
	}

	debounced.flush = function () {
		if (timeout) clearTimeout(timeout)
		return Promise.resolve(invoke())
	}

	debounced.pending = function () {
		return !!timeout
	}

	return debounced
}

/**
 * debounced version of a synchronous function.
 * 同步防抖函数，延迟执行直到等待时间结束。
 *
 * @template T - The type of the function to debounce.
 * @template This - The type of the `this` context for the function.
 *
 * @param {T} fn - The synchronous function to debounce. 要防抖的同步函数。
 * @param {number} [delay=500] - Debounce delay in milliseconds, default 500. 防抖延迟时间（毫秒），默认 500。
 * @returns {DebouncedSync<T, This>} Returns a debounced function with `cancel`, `flush`, and `pending` methods. 返回带取消、立即执行和状态查询功能的防抖函数。
 *
 * @example
 * const syncLog = debounceSync(function (this: any, msg: string) {
 *   console.log("Sync:", msg);
 * }, 300);
 * syncLog("Hello");
 *
 * @example
 * const obj = {
 *   prefix: "[Sync] ",
 *   log: debounceSync(function (this: typeof obj, msg: string) {
 *     console.log(this.prefix + msg);
 *   }, 300),
 * };
 * obj.log("Test"); // 输出：[Sync] Test
 *
 * @example
 * const fn = debounceSync(() => console.log("Run"), 500);
 * fn();
 * fn.cancel(); // 取消执行
 *
 * @example
 * const fn2 = debounceSync(() => console.log("Run later"), 500);
 * fn2();
 * fn2.flush(); // 立即执行
 */
export function debounceSync<T extends (...args: any[]) => any, This = any>(
	fn: T,
	delay: number = 500
): DebouncedSync<T, This> {
	let timeout: ReturnType<typeof setTimeout> | null = null
	let lastArgs: Parameters<T> | null = null
	let lastThis: This | null = null

	const reset = () => {
		timeout = null
		lastArgs = null
		lastThis = null
	}

	const invoke = (): ReturnType<T> | void => {
		if (!lastArgs) return
		try {
			const result = fn.apply(lastThis, lastArgs)
			reset()
			return result
		} catch (err) {
			reset()
			throw err
		}
	}

	function debounced(this: This, ...args: Parameters<T>): ReturnType<T> | void {
		if (timeout) clearTimeout(timeout)

		lastArgs = args
		lastThis = this

		timeout = setTimeout(() => {
			invoke()
		}, delay)
	}

	debounced.cancel = () => {
		if (timeout) clearTimeout(timeout)
		reset()
	}

	debounced.flush = () => {
		if (timeout) clearTimeout(timeout)
		return invoke()
	}

	debounced.pending = () => !!timeout

	return debounced
}
