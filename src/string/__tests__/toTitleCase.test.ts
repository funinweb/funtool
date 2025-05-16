import { describe, expect, it } from 'vitest';
import { toTitleCase } from '../toTitleCase';

describe('toTitleCase', () => {
  it('converts snake_case to Title Case', () => {
    expect(toTitleCase('hello_world')).toBe('Hello World');
  });

  it('converts kebab-case to Title Case', () => {
    expect(toTitleCase('hello-world')).toBe('Hello World');
  });

  it('converts space separated to Title Case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
  });

  it('handles single words', () => {
    expect(toTitleCase('hello')).toBe('Hello');
  });

  it('handles acronyms by normalizing case', () => {
    expect(toTitleCase('API_version')).toBe('Api Version');
  });

  it('handles empty string', () => {
    expect(toTitleCase('')).toBe('');
  });
});