import { describe, it, expect } from 'vitest';
import { removeBefore } from '../removeBefore';

describe('removeBefore', () => {
  it('should remove characters before character', () => {
    expect(removeBefore('foo-bar', '-')).toBe('-bar');
  });

  it('should remove characters before index', () => {
    expect(removeBefore('hello', 3)).toBe('lo');
  });

  it('should return original if target not found', () => {
    expect(removeBefore('abc', 'z')).toBe('abc');
  });
});
