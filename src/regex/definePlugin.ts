import {store} from './store';
export type RegexValidateContext<T extends string> = {
  name: T;
  pattern: RegExp;
  input: string;
}
export interface DefineRegexPlugin<T extends string> {
  name: T;
  pattern: RegExp;
  validate: (ctx: RegexValidateContext<T>) => boolean;
}

// export function definePlugin<Name extends string>(plugin: RulePlugin<Name>): RulePlugin<Name> {
//   if(store.isInternal(plugin.name)) {
//     throw new Error(`Cannot register plugin with reserved name: '${plugin.name}'`);
//   }
//   store.register(plugin);
//   return plugin;
// }

export function definePlugin<Name extends string>(plugin: DefineRegexPlugin<Name>): DefineRegexPlugin<Name> {
  store.register(plugin, true);
  return plugin;
}