import { describe, it, expect } from 'vitest';
import { isFunction } from '../isFunction';

describe('isFunction', () => {
  it('should return true for functions', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction(function() {})).toBe(true);
    expect(isFunction(class {})).toBe(true);
  });

  it('should return false for non-functions', () => {
    expect(isFunction('not a function')).toBe(false);
    expect(isFunction(123)).toBe(false);
    expect(isFunction({})).toBe(false);
    expect(isFunction([])).toBe(false);
  });
});