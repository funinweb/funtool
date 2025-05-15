import { describe, it, expect } from 'vitest';
import { isArray } from '../isArray';

 describe('isArray', () => {
  it('should return true for arrays', () => {
    expect(isArray([])).toBe(true);
    expect(isArray([1, 2, 3])).toBe(true);
  });

  it('should return false for non-arrays', () => {
    expect(isArray('not an array')).toBe(false);
    expect(isArray({})).toBe(false);
    expect(isArray(123)).toBe(false);
  });
});