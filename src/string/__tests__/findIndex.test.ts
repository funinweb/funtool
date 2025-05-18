import { describe, it, expect } from 'vitest';
import { findIndex } from '../findIndex';

describe('findIndex', () => {
  it('should find index of substring', () => {
    expect(findIndex('hello world', 'world')).toBe(6);
  });

  it('should return -1 if not found', () => {
    expect(findIndex('abc', 'z')).toBe(-1);
  });
});
