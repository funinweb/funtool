/**
 * Creates a flexible currying function with auto-reset and optional trigger condition.
 * 创建一个灵活的柯里化函数，支持参数累积、自动重置和可选触发条件。
 *
 * @template Args Argument types 参数类型
 * @template R Return type 返回值类型
 * @param options Options for configuring the currying behavior 配置柯里化行为的选项
 * @param options.fn Function to execute after collecting arguments 收集完参数后执行的函数
 * @param options.done Optional condition to trigger execution 可选触发条件，返回 true 时立即执行
 * @returns A chainable function with `.map`, `.filter`, `.value`, and implicit conversion
 * 支持 `.map`、`.filter`、`.value` 和隐式转换的可链式函数
 *
 * @example
 * const sum = currying({
 *   fn: (...args) => args.reduce((a, b) => a + b, 0),
 *   done: args => args.length >= 3
 * });
 * const result = sum(1)(2)(3); // auto executes → 6
 *
 * @example
 * const product = currying({ fn: (...args) => args.reduce((a, b) => a * b, 1) });
 * const result = product(2)(3)(4).value(); // manually executes → 24
 *
 * @example
 * const result = product(1)(2)(3)
 *   .map(x => x * 2)
 *   .filter(x => x > 2)
 *   .value(); // (1, 2, 3) → (2, 4, 6) → (4, 6) → 24
 */
export function currying<Args extends any[], R>(options: {
  fn: (...args: Args) => R;
  done?: (args: Args) => boolean;
}) {
  const { fn, done } = options;

  function createCurried(args: any[] = []) {
    const curried = (...newArgs: any[]) => {
      const allArgs = [...args, ...newArgs];
      if (done && done(allArgs as Args)) {
        return fn(...(allArgs as Args));
      }
      return createCurried(allArgs);
    };

    /**
     * Applies a mapping function to all collected arguments.
     * 对所有已收集的参数执行映射函数。
     * @param mapper Mapping function 映射函数
     * @returns The new curried function with mapped arguments
     * 返回映射后的新的柯里化函数实例
     */
    curried.map = (mapper: (v: any) => any) => {
      const newArgs = args.map(mapper);
      return createCurried(newArgs);
    };

    /**
     * Applies a filtering function to the collected arguments.
     * 对所有已收集的参数执行过滤函数。
     * @param predicate Filtering function 过滤函数
     * @returns The new curried function with filtered arguments
     * 返回过滤后的新的柯里化函数实例
     */
    curried.filter = (predicate: (v: any) => boolean) => {
      const newArgs = args.filter(predicate);
      return createCurried(newArgs);
    };

    /**
     * Manually triggers execution with current collected arguments.
     * 手动触发函数执行。
     * @returns The return value of the original function 原始函数的返回值
     */
    curried.value = () => fn(...(args as Args));

    /** Allows implicit coercion via +func or `${func}` 支持通过 +func 或 `${func}` 的隐式转换 */
    curried.valueOf = () => curried.value();
    curried.toString = () => String(curried.value());

    return curried as ((...args: any[]) => any) & {
      value: () => R;
      map: (fn: (v: any) => any) => typeof curried;
      filter: (fn: (v: any) => boolean) => typeof curried;
      valueOf: () => R;
      toString: () => string;
    };
  }

  return createCurried();
}
