import {store} from './store';
export interface RulePlugin<T extends string> {
  name: T;
  pattern: RegExp;
  validate: (input: string) => boolean;
}

// export function definePlugin<Name extends string>(plugin: RulePlugin<Name>): RulePlugin<Name> {
//   if(store.isInternal(plugin.name)) {
//     throw new Error(`Cannot register plugin with reserved name: '${plugin.name}'`);
//   }
//   store.register(plugin);
//   return plugin;
// }

export function definePlugin<Name extends string>(plugin: RulePlugin<Name>): RulePlugin<Name> {
  store.register(plugin, true);
  return plugin;
}