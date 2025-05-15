import { describe, it, expect } from 'vitest';
import { isTypedArray } from '../isTypedArray';

describe('isTypedArray', () => {
  it('should return true for TypedArray objects', () => {
    expect(isTypedArray(new Uint8Array())).toBe(true);
    expect(isTypedArray(new Int32Array())).toBe(true);
    expect(isTypedArray(new Float64Array())).toBe(true);
  });

  it('should return false for non-TypedArray objects', () => {
    expect(isTypedArray([])).toBe(false);
    expect(isTypedArray({})).toBe(false);
    expect(isTypedArray('not a typed array')).toBe(false);
    expect(isTypedArray(123)).toBe(false);
  });
});