import { describe, it, expect } from 'vitest';
import { insertBefore } from '../insertBefore';

describe('insertBefore', () => {
  it('should insert before index', () => {
    expect(insertBefore('hello', 'X', 1)).toBe('hXello');
  });

  it('should insert before character', () => {
    expect(insertBefore('foo-bar', '_', '-')).toBe('foo_-bar');
  });

  it('should return original if target not found', () => {
    expect(insertBefore('abc', '_', 'z')).toBe('abc');
  });
});
