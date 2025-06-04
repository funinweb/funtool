import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'qq',
  pattern: /^[1-9][0-9]{4,9}$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})