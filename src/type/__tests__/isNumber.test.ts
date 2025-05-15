import { describe, it, expect } from 'vitest';
import { isNumber,isInt,isFloat } from '../isNumber';

describe('isNumber', () => {
  it('should return true for numbers', () => {
    expect(isNumber(123)).toBe(true);
    expect(isNumber(0)).toBe(true);
    expect(isNumber(-1.23)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(true);
    expect(isInt(123)).toBe(true);
    expect(isFloat(123.1)).toBe(true);
  });

  it('should return false for non-numbers', () => {
    expect(isNumber('123')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
    expect(isNumber([])).toBe(false);
    expect(isInt(123.1)).toBe(false);
    expect(isFloat(123)).toBe(false);
  });
});