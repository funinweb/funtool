import email from "./email";
import mobile from "./mobile";

export const plugins = [
  email,
  mobile
] as const

export type RuleName = typeof plugins[number]['name'];