import { describe, it, expect } from 'vitest';
import { removeAt } from '../removeAt';

describe('removeAt', () => {
  it('should remove character at index', () => {
    expect(removeAt('hello', 1)).toBe('hllo');
  });

  it('should remove matching character', () => {
    expect(removeAt('abc-def', '-')).toBe('abcdef');
  });

  it('should return original if character not found', () => {
    expect(removeAt('xyz', 'q')).toBe('xyz');
  });
});
