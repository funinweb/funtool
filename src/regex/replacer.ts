import { RuleName } from './plugins';
import { store } from './store';
/**
 * @description Class for replacing parts of a string using a rule or regular expression.
 * @author xiaoqiujun
 * @date 23/05/2025
 * @export
 * @class Replacer
 */
export class Replacer {
  /** The original input string */
  private input: string;

  /** The pattern to use for replacement */
  private pattern?: RegExp;

  /**
   * Create a new Replacer instance.
   * @param input The input string to perform replacements on.
   */
  constructor(input: string) {
    this.input = input;
  }

  /**
   * Set the rule or regular expression to use for replacement.
   * @param rule A registered rule name or a RegExp object.
   * @returns The Replacer instance for method chaining.
   * @throws Will throw an error if the rule name is not registered.
   */
  use(rule: RuleName | RegExp): this {
    if (rule instanceof RegExp) {
      this.pattern = rule;
    } else {
      const plugin = store.get(rule);
      if (!plugin) throw new Error(`Unknown rule: '${rule}'`);
      this.pattern = plugin.pattern;
    }
    return this;
  }

  /**
   * Perform the replacement operation.
   * @param replacer A replacement string or a function to transform matches.
   * @returns The Replacer instance for method chaining.
   * @throws Will throw an error if no pattern has been defined via `.use()`.
   */
  with(replacer: string | ((match: string) => string)): this {
    if (!this.pattern) throw new Error('No pattern defined. Call .use() first.');
    this.input = this.input.replace(this.pattern, replacer as any);
    return this;
  }

  /**
   * Get the final string after all replacements.
   * @returns The transformed string.
   */
  result(): string {
    return this.input;
  }
}
