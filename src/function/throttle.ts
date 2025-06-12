type Throttled<T extends (...args: any[]) => any, This = any> = {
  (this: This, ...args: Parameters<T>): Promise<ReturnType<T> | undefined>;
  cancel: () => void;
  flush: () => Promise<ReturnType<T> | undefined>;
  pending: () => boolean;
};

type ThrottledSync<T extends (...args: any[]) => void, This = any> = {
  (this: This, ...args: Parameters<T>): void;
  cancel: () => void;
  flush: () => void;
  pending: () => boolean;
};

/**
 * Creates a throttled version of the provided async function.
 * 创建一个节流函数，确保在指定时间间隔内最多执行一次。
 *
 * @template T - 要节流的函数类型
 * @template This - 函数中的 this 上下文类型
 *
 * @param {T} fn - 原始函数
 * @param {number} [interval=500] - 节流间隔时间（单位：毫秒）
 * @returns {Throttled<T, This>} 返回一个带 cancel、flush、pending 方法的节流函数
 *
 * @example
 * // 基本用法
 * const throttled = throttle((msg) => console.log(msg), 1000);
 * throttled("Hi"); throttled("Skip"); // 只打印 "Hi"
 *
 * @example
 * // 使用 flush 强制执行最后一次
 * const fn = throttle(() => console.log("Fire!"), 1000);
 * fn(); fn(); fn.flush(); // 输出两次
 */
export function throttle<T extends (...args: any[]) => any, This = any>(
  fn: T,
  interval: number = 500
): Throttled<T, This> {
  let lastCallTime: number | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: This | null = null;
  let pendingResolve: ((value: ReturnType<T> | PromiseLike<ReturnType<T>> | undefined) => void) | null = null;

  const invoke = () => {
    lastCallTime = Date.now();
    const result = fn.apply(lastThis, lastArgs!);
    pendingResolve?.(result);
    reset();
    return result;
  };

  const reset = () => {
    timeout = null;
    lastArgs = null;
    lastThis = null;
    pendingResolve = null;
  };

  function throttled(this: This, ...args: Parameters<T>): Promise<ReturnType<T> | undefined> {
    const now = Date.now();
    const remaining = lastCallTime ? interval - (now - lastCallTime) : 0;

    lastArgs = args;
    lastThis = this;

    return new Promise((resolve) => {
      pendingResolve = resolve;

      if (remaining <= 0) {
        invoke();
      } else if (!timeout) {
        timeout = setTimeout(invoke, remaining);
      }
    });
  }

  throttled.cancel = () => {
    if (timeout) clearTimeout(timeout);
    reset();
  };

  throttled.flush = () => {
    if (timeout) {
      clearTimeout(timeout);
      return Promise.resolve(invoke());
    }
    return Promise.resolve(undefined);
  };

  throttled.pending = () => Boolean(timeout);

  return throttled;
}

/**
 * Creates a throttled version of a sync function (no return value).
 * 创建一个同步节流函数，确保在间隔时间内最多调用一次。
 *
 * @template T - 函数类型
 * @template This - this 上下文类型
 *
 * @param {T} fn - 原始函数
 * @param {number} [interval=500] - 节流时间（毫秒）
 * @returns {ThrottledSync<T, This>} 返回节流函数，附带 cancel、flush、pending
 *
 * @example
 * const throttled = throttleSync((msg) => console.log(msg), 1000);
 * throttled("Hi"); throttled("Skipped"); // 只打印一次
 */
export function throttleSync<T extends (...args: any[]) => void, This = any>(
  fn: T,
  interval: number = 500
): ThrottledSync<T, This> {
  let lastCallTime: number | null = null;
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: Parameters<T> | null = null;
  let lastThis: This | null = null;

  const invoke = () => {
    lastCallTime = Date.now();
    fn.apply(lastThis, lastArgs!);
    reset();
  };

  const reset = () => {
    timeout = null;
    lastArgs = null;
    lastThis = null;
  };

  function throttled(this: This, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = lastCallTime ? interval - (now - lastCallTime) : 0;

    lastArgs = args;
    lastThis = this;

    if (remaining <= 0) {
      invoke();
    } else if (!timeout) {
      timeout = setTimeout(invoke, remaining);
    }
  }

  throttled.cancel = () => {
    if (timeout) clearTimeout(timeout);
    reset();
  };

  throttled.flush = () => {
    if (timeout) {
      clearTimeout(timeout);
      invoke();
    }
  };

  throttled.pending = () => Boolean(timeout);

  return throttled;
}