import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DefineRegexPlugin, regex } from '../index';
import { store } from '../store';
import { Checker } from '../checker';
import { Replacer } from '../replacer';
import alpha from '../plugins/alpha';
import chinese from '../plugins/chinese';
import html from '../plugins/html';
import ipv4 from '../plugins/ipv4';
import landline from '../plugins/landline';
import nonAscii from '../plugins/nonAscii';
import nonLatin from '../plugins/nonLatin';
import number from '../plugins/number';
import password from '../plugins/password';
import qq from '../plugins/qq';
import url from '../plugins/url';
import username from '../plugins/username';

// Mock Checker and Replacer classes
// vi.mock('../checker');
// vi.mock('../replacer');

// Sample test plugins
const testEmail:DefineRegexPlugin<string> = {
  name: 'email',
  pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/i,
  validate: (ctx) => ctx.pattern.test(ctx.input),
};
const testMobile = {
  name: 'mobile',
  pattern: /^1\d{10}$/,
  validate: (ctx) => ctx.pattern.test(ctx.input),
};

describe('Regex class tests', () => {
  beforeEach(() => {
    // Clear global store to avoid test pollution
    if (store.reset) {
      store.reset();
      regex.definePlugin(testMobile);
      // 注册所有测试插件
      regex.definePlugin(alpha);
      regex.definePlugin(chinese);
      regex.definePlugin(html);
      regex.definePlugin(ipv4);
      regex.definePlugin(landline);
      regex.definePlugin(nonAscii);
      regex.definePlugin(nonLatin);
      regex.definePlugin(number);
      regex.definePlugin(password);
      regex.definePlugin(qq);
      regex.definePlugin(url);
      regex.definePlugin(username);
    }
  });

  describe('definePlugin method', () => {
    it('should register a plugin successfully', () => {
      const result = regex.definePlugin(testEmail);
      expect(result).toEqual(testEmail);
      expect(store.get('email')).toBeDefined();
    });

    it('should throw error when registering duplicate plugin', () => {
      regex.definePlugin(testEmail);
      expect(() => regex.definePlugin(testEmail)).toThrow(`Rule 'email' is already registered.`);
    });
  });

  describe('checker method', () => {
    it('should return a Checker instance', () => {
      const input = 'test string';
      const result = regex.checker(input);
      expect(result).toBeInstanceOf(Checker);
    });
  });

  describe('replacer method', () => {
    it('should return a Replacer instance', () => {
      const input = 'test string';
      const result = regex.replacer(input);
      expect(result).toBeInstanceOf(Replacer);
    });
    it('should replace using registered rule', () => {
      const input = 'Contact me at test@example.com';
      regex.definePlugin(testEmail);
      const result = regex.replacer(input)
        .use('email')
        .with('***')
        .result();
      expect(result).toBe('Contact me at ***');
    });
    it('should replace using direct regex', () => {
      const input = '123-456-7890';
      const result = regex.replacer(input)
        .use(/\d+/g)
        .with('X')
        .result();
      expect(result).toBe('X-X-X');
    });
  });

  describe('check mobile', () => {
    it('should return true for a valid phone number', () => {
      const input = '13800138000';
      const result = regex.checker(input).use('mobile').isValid();
      expect(result).toBe(true);
    });
  })
  describe('alpha plugin', () => {
    it('should validate alphabetic strings', () => {
      expect(regex.checker('abc').use(alpha.pattern).isValid()).toBe(true);
      expect(regex.checker('123').use(alpha.pattern).isValid()).toBe(false);
    });
  });
  describe('chinese plugin', () => {
    it('should validate chinese characters', () => {
      expect(regex.checker('中文').use(chinese.pattern).isValid()).toBe(true);
      expect(regex.checker('English').use(chinese.pattern).isValid()).toBe(false);
    });
  });
  describe('html plugin', () => {
    it('should validate html tags', () => {
      expect(regex.checker('<div>content</div>').use(html.pattern).isValid()).toBe(true);
      expect(regex.checker('plain text').use(html.pattern).isValid()).toBe(false);
    });
  });
  describe('ipv4 plugin', () => {
    it('should validate ipv4 addresses', () => {
      expect(regex.checker('192.168.1.1').use('ipv4').isValid()).toBe(true);
      expect(regex.checker('256.1.1.1').use('ipv4').isValid()).toBe(false);
    });
  });
  describe('landline plugin', () => {
    it('should validate landline numbers', () => {
      expect(regex.checker('010-12345678').use('landline').isValid()).toBe(true);
      expect(regex.checker('12345678').use('landline').isValid()).toBe(false);
    });
  });
  describe('nonAscii plugin', () => {
    it('should validate non-ASCII characters', () => {
      expect(regex.checker('中文').use('nonAscii').isValid()).toBe(true);
      expect(regex.checker('abc').use('nonAscii').isValid()).toBe(false);
    });
  });
  describe('url plugin', () => {
    it('should validate URLs', () => {
      expect(regex.checker('http://example.com').use('url').isValid()).toBe(true);
      expect(regex.checker('example.com').use('url').isValid()).toBe(false);
    });
  });
  describe('username plugin', () => {
    it('should validate usernames', () => {
      expect(regex.checker('user_123').use('username').isValid()).toBe(true);
      expect(regex.checker('123user').use('username').isValid()).toBe(false);
    });
  });
});
