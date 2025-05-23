import { describe, it, expect, beforeEach, vi } from 'vitest';
import { regex } from '../index';
import { store } from '../store';
import { Checker } from '../checker';
import { Replacer } from '../replacer';

// Mock Checker and Replacer classes
// vi.mock('../checker');
// vi.mock('../replacer');

// Sample test plugins
const testEmail = {
  name: 'email',
  pattern: /^[\w-]+@[\w-]+\.[a-z]{2,}$/i,
  validate: (input: string) => /^[\w-]+@[\w-]+\.[a-z]{2,}$/i.test(input),
};
const testMobile = {
  name: 'mobile',
  pattern: /^1\d{10}$/,
  validate: (input: string) => /^1\d{10}$/.test(input),
};

describe('Regex class tests', () => {
  beforeEach(() => {
    // Clear global store to avoid test pollution
    if (store.reset) {
      store.reset();
      regex.definePlugin(testMobile);
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
  });

  describe('check mobile', () => {
    it('should return true for a valid phone number', () => {
      const input = '13800138000';
      const result = regex.checker(input).use('mobile').isValid();
      expect(result).toBe(true);
    });
  })
});
