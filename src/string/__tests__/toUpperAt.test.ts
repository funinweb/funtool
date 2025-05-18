import { describe, it, expect } from 'vitest';
import { toUpperAt } from '../toUpperAt';

describe('toUpperAt', () => {
  it('should uppercase character at index', () => {
    expect(toUpperAt('hello', 0)).toBe('Hello');
  });

  it('should uppercase matching character', () => {
    expect(toUpperAt('foo-bar', 'b')).toBe('foo-Bar');
  });

  it('should return original if target not found', () => {
    expect(toUpperAt('abc', 'z')).toBe('abc');
  });
});