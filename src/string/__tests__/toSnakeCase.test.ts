import { describe, expect, it } from 'vitest';
import { toSnakeCase } from '../toSnakeCase';

describe('toSnakeCase', () => {
  it('converts camelCase to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });

  it('converts kebab-case to snake_case', () => {
    expect(toSnakeCase('hello-world')).toBe('hello_world');
  });

  it('converts space separated to snake_case', () => {
    expect(toSnakeCase('hello world')).toBe('hello_world');
  });

  it('handles single words', () => {
    expect(toSnakeCase('hello')).toBe('hello');
  });

  it('handles acronyms by normalizing case', () => {
    expect(toSnakeCase('APIVersion')).toBe('api_version');
  });

  it('handles empty string', () => {
    expect(toSnakeCase('')).toBe('');
  });
});