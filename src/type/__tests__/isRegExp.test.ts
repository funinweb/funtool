import { describe, it, expect } from 'vitest';
import { isRegExp } from '../isRegExp';

describe('isRegExp', () => {
  it('should return true for RegExp objects', () => {
    expect(isRegExp(/abc/)).toBe(true);
    expect(isRegExp(new RegExp('abc'))).toBe(true);
  });

  it('should return false for non-RegExp objects', () => {
    expect(isRegExp('not a regexp')).toBe(false);
    expect(isRegExp({})).toBe(false);
    expect(isRegExp([])).toBe(false);
    expect(isRegExp(123)).toBe(false);
  });
});