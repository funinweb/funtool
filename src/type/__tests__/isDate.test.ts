import { describe, it, expect } from 'vitest';
import { isDate } from '../isDate';

 describe('isDate', () => {
  it('should return true for Date', () => {
    expect(isDate(new Date())).toBe(true);
  });

  it('should return false for non-Date', () => {
    expect(isDate('not a Date')).toBe(false);
    expect(isDate([])).toBe(false);
    expect(isDate({})).toBe(false);
  });
});