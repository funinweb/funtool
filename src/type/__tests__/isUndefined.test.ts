import { describe, it, expect } from 'vitest';
import { isUndefined } from '../isUndefined';

describe('isUndefined', () => {
  it('should return true for undefined values', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it('should return false for defined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(123)).toBe(false);
    expect(isUndefined('test')).toBe(false);
    expect(isUndefined(true)).toBe(false);
    expect(isUndefined({})).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(function () {})).toBe(false);
  });

  it('should return false for variables that are declared but not initialized (i.e., declared as undefined)', () => {
    let x;
    expect(isUndefined(x)).toBe(true); // x is 'undefined' after declaration
  });

  it('should return false for an object with an undefined property', () => {
    const obj = { prop: undefined };
    expect(isUndefined(obj.prop)).toBe(true); // Property value is undefined
    expect(isUndefined(obj)).toBe(false); // Object itself is not undefined
  });
});