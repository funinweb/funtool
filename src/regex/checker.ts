import { RuleName } from './plugins';
import { store } from './store';

/**
 * Class for validating a string against registered rules or regular expressions.
 */
/**
 * @description Class for validating a string against registered rules or regular expressions.
 * @author xiaoqiujun
 * @date 23/05/2025
 * @export
 * @class Checker
 */
export class Checker {
  /** Input string to be validated */
  private input: string = "";

  /** Current validation result */
  private result = true;

  /** Flag indicating whether the next validation should be negated */
  private isNegated = false;

  /**
   * Create a new Checker instance.
   * @param input The input string to validate.
   */
  constructor(input: string) {
    this.input = input;
  }

  /**
   * Apply a rule or regular expression to the input string.
   * @param rule A registered rule name or a RegExp instance.
   * @returns The Checker instance for method chaining.
   * @throws Will throw an error if the rule name is not registered.
   */
  use(rule: RuleName | RegExp): this {
    console.log(store.get(rule as RuleName)); // 看是否有值
    let passed = false;
    if (rule instanceof RegExp) {
      passed = rule.test(this.input);
    } else {
      const plugin = store.get(rule);
      if (!plugin) throw new Error(`Unknown rule: '${rule}'`);
      passed = plugin.validate(this.input);
    }
    this.result = this.isNegated ? !passed : passed;
    this.isNegated = false;
    return this;
  }

  /**
   * Negate the result of the next validation rule.
   * @returns The Checker instance for method chaining.
   */
  not(): this {
    this.isNegated = true;
    return this;
  }

  /**
   * Get the final validation result.
   * @returns `true` if the validation passed, otherwise `false`.
   */
  isValid(): boolean {
    return this.result;
  }
}
