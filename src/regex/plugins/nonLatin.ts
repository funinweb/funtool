import { definePlugin } from "../definePlugin";
/**
 * This regular expression is used to match all characters that do not belong to the Latin character set.
 * Such as Chinese, Japanese, Arabic, and other non-Latin scripts.
 */
export default definePlugin({
  name: 'nonLatin',
  pattern: /[^\u0000-\u024F]/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})