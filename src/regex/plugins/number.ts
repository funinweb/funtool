import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'number',
  pattern: /^[0-9]$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})