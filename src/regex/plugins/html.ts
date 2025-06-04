import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'html',
  pattern: /<("[^"]*"|'[^']*'|[^'">])*>/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})