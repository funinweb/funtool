import { definePlugin } from '../definePlugin';

const mobileRegex = /^1[3|4|5|6|7|8|9][0-9]{9}$/;

const mobile = definePlugin({
  name: 'mobile',
  pattern: mobileRegex,
  validate: (ctx) => ctx.pattern.test(ctx.input),
});

export default mobile;