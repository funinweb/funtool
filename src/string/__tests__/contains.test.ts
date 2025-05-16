import { describe, it, expect } from 'vitest';
import { contains } from '../contains';

describe('contains', () => {
  it('should return true if substring exists', () => {
    expect(contains('hello world', 'world')).toBe(true);
  });

  it('should return false if substring does not exist', () => {
    expect(contains('hello', 'world')).toBe(false);
  });
});
