import { describe, it, expect } from 'vitest';
import { isBuffer } from '../isBuffer';

 describe('isBuffer', () => {
  it('should return true for Buffer', () => {
    const buffer = Buffer.from('test');
    expect(isBuffer(buffer)).toBe(true);
  });

  it('should return false for non-Buffer', () => {
    expect(isBuffer('not a Buffer')).toBe(false);
    expect(isBuffer([])).toBe(false);
    expect(isBuffer({})).toBe(false);
  });
});