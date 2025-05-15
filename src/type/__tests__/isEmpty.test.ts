import { describe, it, expect } from 'vitest';
import { isEmpty } from '../isEmpty';

 describe('isEmpty', () => {
  it('should return true for empty values', () => {
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
  });

  it('should return false for non-empty values', () => {
    expect(isEmpty('not empty')).toBe(false);
    expect(isEmpty([1, 2, 3])).toBe(false);
    expect(isEmpty({ key: 'value' })).toBe(false);
  });
});