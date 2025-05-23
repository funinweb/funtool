import { definePlugin } from "./definePlugin";
import { RuleName } from "./plugins";

/**
 * Listener function type. It takes an object of plugins and returns void.
 * @param plugins - An object where keys are plugin names and values are plugin instances.
 */
type Listener = (plugins: Record<string, ReturnType<typeof definePlugin>>) => void;
/**
 * @description A singleton class that manages the registration and retrieval of regex rules.
 * @author xiaoqiujun
 * @date 23/05/2025
 * @class Store
 */
class Store {
  /**
   * The single instance of the Store class.
   */
  private static instance: Store | null = null;

  /**
   * A map that stores all registered plugins. The key is the plugin name, and the value is the plugin instance.
   */
  private plugins: Map<string, ReturnType<typeof definePlugin>> = new Map();

  /**
   * A set that stores the names of internal rules.
   */
  private internalRuleNames = new Set<string>();

  /**
   * An array of listener functions that will be called when the plugin list changes.
   */
  private listeners: Listener[] = [];
  private constructor() {
    this.plugins = new Map();
    this.internalRuleNames = new Set();
    this.listeners = [];
  }
  public static getInstance(): Store {
    if (!Store.instance) {
      Store.instance = new Store();
    }
    return Store.instance;
  }

  /**
   * Subscribe a listener function to the store. The listener will be called whenever the plugin list changes.
   * @param fn - The listener function to subscribe.
   * @returns A function that can be called to unsubscribe the listener.
   */
  subscribe(fn: Listener) {
    this.listeners.push(fn);

    return () => {
      this.listeners = this.listeners.filter(l => l !== fn);
    };
  }

  /**
   * Notify all subscribed listeners about the current state of the plugins.
   */
  private notify() {
    for (const fn of this.listeners) {
      fn(this.getAll());
    }
  }

  /**
   * Register one or more regex rules in the store.
   * @param rules - A single plugin instance or an array of plugin instances to register.
   * @param internal - A flag indicating whether the rules are internal. Defaults to false.
   * @throws {Error} If a rule with the same name is already registered or if an attempt is made to override an internal rule.
   */
  register(rules: ReturnType<typeof definePlugin> | ReturnType<typeof definePlugin>[], internal = false) {
    const ruleList = Array.isArray(rules) ? rules : [rules];

    ruleList.forEach(r => {
      if(this.plugins.has(r.name)) {
        throw new Error(`Rule '${r.name}' is already registered.`);
      }
      if(internal) {
        this.internalRuleNames.add(r.name);
        Object.defineProperty(r, '_internal', {
          value: true,
          writable: false,
          enumerable: false,
          configurable: false,
        });
      }else {
        if(this.internalRuleNames.has(r.name)) {
          throw new Error(`Rule name '${r.name}' is reserved and cannot be overridden.`);
        }
      }
      this.plugins.set(r.name, r);
    });
    this.notify();
  }

  /**
   * Get a registered plugin by its name.
   * @param name - The name of the plugin to retrieve.
   * @returns The plugin instance if found, otherwise undefined.
   */
  get<RuleName extends string>(name: RuleName): ReturnType<typeof definePlugin<RuleName>> | undefined {
    if(!this.plugins.has(name)) return undefined;
    return this.plugins.get(name) as ReturnType<typeof definePlugin<RuleName>>;
  }

  /**
   * Get all registered plugins as an object.
   * @returns An object containing all registered plugins.
   */
  getAll(): Record<RuleName, ReturnType<typeof definePlugin<RuleName>>> {
    return Object.fromEntries(this.plugins) as Record<RuleName, ReturnType<typeof definePlugin<RuleName>>>;
  }

  /**
   * Check if a rule is an internal rule.
   * @param name - The name of the rule to check.
   * @returns True if the rule is internal, otherwise false.
   */
  isInternal(name: string): boolean {
    return this.internalRuleNames.has(name);
  }

  /**
   * Reset the store by clearing all registered plugins,
   * internal rule names, and subscribed listeners.
   * This effectively restores the store to its initial empty state.
   */
  reset() {
    this.plugins.clear();
    this.internalRuleNames.clear();
    this.listeners = [];
    this.notify();
  }
}
export const store = Store.getInstance();