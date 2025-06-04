import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'ipv4',
  pattern: /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})