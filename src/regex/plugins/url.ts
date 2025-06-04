import { definePlugin } from "../definePlugin";

export default definePlugin({
  name: 'url',
  pattern: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})