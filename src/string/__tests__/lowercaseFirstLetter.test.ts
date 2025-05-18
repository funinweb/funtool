import { describe, expect, it } from 'vitest';
import { lowercaseFirstLetter } from '../lowercaseFirstLetter';

describe('lowercaseFirstLetter', () => {
  it('lowercases the first letter of a string', () => {
    expect(lowercaseFirstLetter('Hello')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(lowercaseFirstLetter('')).toBe('');
  });

  it('does not modify already lowercase strings', () => {
    expect(lowercaseFirstLetter('hello')).toBe('hello');
  });

  it('handles strings with only one character', () => {
    expect(lowercaseFirstLetter('H')).toBe('h');
  });
});