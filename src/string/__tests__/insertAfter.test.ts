import { describe, it, expect } from 'vitest';
import { insertAfter } from '../insertAfter';

describe('insertAfter', () => {
  it('should insert after index', () => {
    expect(insertAfter('hello', 'X', 1)).toBe('heXllo');
  });

  it('should insert after character', () => {
    expect(insertAfter('foo-bar', '_', '-')).toBe('foo-_bar');
  });

  it('should return original if target not found', () => {
    expect(insertAfter('abc', '_', 'z')).toBe('abc');
  });
});
