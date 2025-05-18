import { describe, expect, it } from 'vitest';
import { trimStart } from '../trimStart';

describe('trimStart', () => {
  it('removes whitespace from left end', () => {
    expect(trimStart('  hello')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(trimStart('')).toBe('');
  });

  it('handles tabs and newlines', () => {
    expect(trimStart('\thello')).toBe('hello');
  });
});