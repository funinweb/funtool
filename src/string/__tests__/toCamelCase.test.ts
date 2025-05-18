import { describe, expect, it } from 'vitest';
import { toCamelCase } from '../toCamelCase';

describe('toCamelCase', () => {
  it('converts snake_case to camelCase', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
  });

  it('converts kebab-case to camelCase', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
  });

  it('converts space separated to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  it('handles single words', () => {
    expect(toCamelCase('hello')).toBe('hello');
  });

  it('handles acronyms by normalizing case', () => {
    expect(toCamelCase('API_version')).toBe('apiVersion');
  });

  it('handles empty string', () => {
    expect(toCamelCase('')).toBe('');
  });
});