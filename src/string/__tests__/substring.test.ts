import { describe, it, expect } from 'vitest';
import { substring } from '../substring';

describe('substring', () => {
  it('should extract substring from start to end index', () => {
    expect(substring('hello world', 0, 5)).toBe('hello');
  });

  it('should handle same start and end index', () => {
    expect(substring('abc', 2, 2)).toBe('');
  });
});
