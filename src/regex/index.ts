import { Checker } from './checker';
import { Replacer } from './replacer';
import {store} from './store'
import {RulePlugin} from './definePlugin'

export {RulePlugin} from './definePlugin'

/**
 * Checker and Replacer tools.
 */
class Regex {
  private static instance: Regex | null = null;

  private constructor() {
  }

  public static getInstance(): Regex {
    if (!Regex.instance) {
      Regex.instance = new Regex();
    }
    return Regex.instance;
  }
  /**
   * Create a new Checker instance for validating input strings.
   *
   * @param input The string to validate.
   * @returns {Checker} A Checker instance for rule validation.
   */
  public checker(input: string): Checker {
    return new Checker(input);
  }
  /**
   * Create a new Replacer instance for performing regex-based replacements.
   *
   * @param input The string to perform replacements on.
   * @returns {Replacer} A Replacer instance for rule-based replacements.
   */
  public replacer(input: string): Replacer {
    return new Replacer(input);
  }

  /**
   * Define and register a new custom plugin rule.
   *
   * Throws an error if the plugin name conflicts with internal reserved names.
   *
   * @template Name
   * @param {RulePlugin<Name>} plugin - The plugin definition object to register.
   * @returns {RulePlugin<Name>} The registered plugin.
   * @throws {Error} If plugin name is reserved/internal.
   */
  public definePlugin<Name extends string>(plugin: RulePlugin<Name>):RulePlugin<Name> {
    if(store.isInternal(plugin.name)) {
      throw new Error(`Cannot register plugin with reserved name: '${plugin.name}'`);
    }
    store.register(plugin);
    return plugin;
  }
}

export const regex = Regex.getInstance();

// Auto-generated section (do not modify manually)

// Exports
// export { definePlugin } from './definePlugin';

// End of auto-generated section
