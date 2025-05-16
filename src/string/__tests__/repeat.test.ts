import { describe, it, expect } from 'vitest';
import { repeat } from '../repeat';

describe('repeat', () => {
  it('should repeat the string', () => {
    expect(repeat('hi', 3)).toBe('hihihi');
  });

  it('should return empty string if count is 0', () => {
    expect(repeat('hi', 0)).toBe('');
  });
});
