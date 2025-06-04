import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'username',
  pattern: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})