import { describe, expect, it } from 'vitest';
import { toKebabCase } from '../toKebabCase';

describe('toKebabCase', () => {
  it('converts snake_case to kebab-case', () => {
    expect(toKebabCase('hello_world')).toBe('hello-world');
  });

  it('converts camelCase to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
  });

  it('converts space separated to kebab-case', () => {
    expect(toKebabCase('hello world')).toBe('hello-world');
  });

  it('handles single words', () => {
    expect(toKebabCase('hello')).toBe('hello');
  });

  it('handles acronyms by normalizing case', () => {
    expect(toKebabCase('APIversion')).toBe('ap-iversion');
    expect(toKebabCase('HTTPStatusCode')).toBe('http-status-code');
    expect(toKebabCase('JSONData')).toBe('json-data');
  });

  it('handles empty string', () => {
    expect(toKebabCase('')).toBe('');
  });
});