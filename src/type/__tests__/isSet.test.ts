import { describe, it, expect } from 'vitest';
import { isSet } from '../isSet';

describe('isSet', () => {
  it('should return true for Set objects', () => {
    expect(isSet(new Set())).toBe(true);
    expect(isSet(new Set([1, 2, 3]))).toBe(true);
  });

  it('should return false for non-Set objects', () => {
    expect(isSet({})).toBe(false);
    expect(isSet([])).toBe(false);
    expect(isSet('not a set')).toBe(false);
    expect(isSet(123)).toBe(false);
  });
});