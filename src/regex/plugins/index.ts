import email from "./email";
import mobile from "./mobile";
import alpha from './alpha';
import chinese from "./chinese";
import ipv6 from "./ipv6";
import postal from "./postal";
import username from "./username";
import ipv4 from "./ipv4";
import IDCard from "./idcard";
import url from "./url";
import qq from "./qq";
import landline from "./landline";
import number from "./number";
import nonAscii from "./nonAscii";
import nonLatin from "./nonLatin";
import password from "./password";
import html from "./html";


export const plugins = [
  email,
  mobile,
  alpha,
  chinese,
  ipv6,
  postal,
  username,
  ipv4,
  IDCard,
  url,
  qq,
  landline,
  number,
  nonAscii,
  nonLatin,
  password,
  html,
] as const

export type RuleName = typeof plugins[number]['name'] & string;