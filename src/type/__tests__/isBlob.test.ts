import { describe, it, expect } from 'vitest';
import { isBlob } from '../isBlob';

 describe('isBlob', () => {
  it('should return true for Blob', () => {
    const blob = new Blob(['test'], { type: 'text/plain' });
    expect(isBlob(blob)).toBe(true);
  });

  it('should return false for non-Blob', () => {
    expect(isBlob('not a Blob')).toBe(false);
    expect(isBlob([])).toBe(false);
    expect(isBlob({})).toBe(false);
  });
});