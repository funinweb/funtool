import { describe, it, expect } from 'vitest';
import { isArrayBuffer } from '../isArrayBuffer';

 describe('isArrayBuffer', () => {
  it('should return true for ArrayBuffer', () => {
    expect(isArrayBuffer(new ArrayBuffer(8))).toBe(true);
  });

  it('should return false for non-ArrayBuffer', () => {
    expect(isArrayBuffer('not an ArrayBuffer')).toBe(false);
    expect(isArrayBuffer([])).toBe(false);
    expect(isArrayBuffer({})).toBe(false);
  });
});