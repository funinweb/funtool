import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'landline',
  pattern: /^0\d{2,3}-?\d{7,8}$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})