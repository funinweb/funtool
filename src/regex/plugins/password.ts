import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'password',
  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})