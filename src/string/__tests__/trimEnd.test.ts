import { describe, expect, it } from 'vitest';
import { trimEnd } from '../trimEnd';

describe('trimEnd', () => {
  it('removes whitespace from right end', () => {
    expect(trimEnd('hello  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(trimEnd('')).toBe('');
  });

  it('handles tabs and newlines', () => {
    expect(trimEnd('hello\n')).toBe('hello');
  });
});