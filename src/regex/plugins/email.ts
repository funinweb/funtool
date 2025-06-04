import { definePlugin } from '../definePlugin';

const emailRegex = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/i;

const email = definePlugin({
  name: 'email',
  pattern: emailRegex,
  validate: (ctx) => ctx.pattern.test(ctx.input),
})

export default email;