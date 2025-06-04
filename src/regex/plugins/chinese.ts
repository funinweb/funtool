import { definePlugin } from "../definePlugin";


//Chinese characters
export default definePlugin({
  name: 'chinese',
  pattern: /^\p{Script=Han}+$/u,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})