import { definePlugin } from '../definePlugin';

const emailRegex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;

const email = definePlugin({
  name: 'email',
  pattern: emailRegex,
  validate: (input: string) => emailRegex.test(input),
})

export default email;