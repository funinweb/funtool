import { describe, it, expect } from 'vitest';
import { reverse } from '../reverse';

describe('reverse', () => {
  it('should reverse the string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  it('should handle empty string', () => {
    expect(reverse('')).toBe('');
  });
});
