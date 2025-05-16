import { describe, expect, it } from 'vitest';
import { toPascalCase } from '../toPascalCase';

describe('toPascalCase', () => {
  it('converts snake_case to PascalCase', () => {
    expect(toPascalCase('hello_world')).toBe('HelloWorld');
  });

  it('converts kebab-case to PascalCase', () => {
    expect(toPascalCase('hello-world')).toBe('HelloWorld');
  });

  it('converts space separated to PascalCase', () => {
    expect(toPascalCase('hello world')).toBe('HelloWorld');
  });

  it('handles single words', () => {
    expect(toPascalCase('hello')).toBe('Hello');
  });

  it('handles acronyms by normalizing case', () => {
    expect(toPascalCase('API_version')).toBe('APIVersion');
  });

  it('handles empty string', () => {
    expect(toPascalCase('')).toBe('');
  });
});