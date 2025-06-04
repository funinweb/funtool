import { definePlugin } from "../definePlugin";


export default definePlugin({
  name: 'alpha',
  pattern: /^[a-zA-Z]+$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})