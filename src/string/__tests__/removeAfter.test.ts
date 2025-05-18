import { describe, it, expect } from 'vitest';
import { removeAfter } from '../removeAfter';

describe('removeAfter', () => {
  it('should remove characters after character', () => {
    expect(removeAfter('foo-bar', '-')).toBe('foo-');
  });

  it('should remove characters after index', () => {
    expect(removeAfter('hello', 3)).toBe('hell');
  });

  it('should return original if target not found', () => {
    expect(removeAfter('abc', 'z')).toBe('abc');
  });
});
