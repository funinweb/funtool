import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'postal',
  pattern: /\d{6}/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})