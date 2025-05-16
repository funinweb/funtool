import { describe, expect, it } from 'vitest';
import { capitalizeFirstLetter } from '../capitalizeFirstLetter';

describe('capitalizeFirstLetter', () => {
  it('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello')).toBe('Hello');
  });

  it('handles empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });

  it('does not modify already capitalized strings', () => {
    expect(capitalizeFirstLetter('Hello')).toBe('Hello');
  });

  it('handles strings with only one character', () => {
    expect(capitalizeFirstLetter('h')).toBe('H');
  });
});