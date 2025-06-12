/**
 * Wrap a Promise or value to return a tuple of [error, data] instead of throwing.
 * 将 Promise 或值包装成返回 [错误, 数据] 的形式，避免 try/catch。
 * 
 * @template T - The type of the resolved data.
 * @param {Promise<T> | T} promiseOrValue - Promise or value to wrap.
 *                                         要包装的 Promise 或值。
 * @returns {Promise<[unknown, undefined] | [null, T]>} A Promise resolving to a tuple.
 *                                                     返回一个 Promise，解析为一个包含错误和数据的元组。
 *
 * @example
 * ```ts
 * const [err, data] = await awaitTo(fetchData());
 * if (err) {
 *   // handle error
 *   // 处理错误
 * }
 * ```
 */
export function awaitTo<T>(
  promiseOrValue: Promise<T> | T
): Promise<[unknown, undefined] | [null, T]> {
  const isPromise = (obj: any): obj is Promise<any> =>
    obj !== null && typeof obj === "object" && typeof obj.then === "function";

  const promise = isPromise(promiseOrValue)
    ? promiseOrValue
    : Promise.resolve(promiseOrValue);

  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[unknown, undefined]>((err: unknown) => [err, undefined]);
}
