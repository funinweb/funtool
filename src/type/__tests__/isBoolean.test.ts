import { describe, it, expect } from 'vitest';
import { isBoolean } from '../isBoolean';

 describe('isBoolean', () => {
  it('should return true for booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  it('should return false for non-booleans', () => {
    expect(isBoolean('not a boolean')).toBe(false);
    expect(isBoolean([])).toBe(false);
    expect(isBoolean({})).toBe(false);
    expect(isBoolean(123)).toBe(false);
  });
});