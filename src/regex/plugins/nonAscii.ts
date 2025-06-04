import { definePlugin } from "../definePlugin";

/**
 * A regular expression to match non-ASCII characters.
 * May include special symbols, emojis.
 */
export default definePlugin({
  name: 'nonAscii',
  pattern: /[^\x00-\xff]/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})