import { describe, it, expect } from 'vitest';
import { count } from '../count';

describe('count', () => {
  it('should count all occurrences of substring', () => {
    expect(count('hello world, hello again', 'hello')).toBe(2);
  });

  it('should return 0 if substring not found', () => {
    expect(count('abc', 'x')).toBe(0);
  });
});
