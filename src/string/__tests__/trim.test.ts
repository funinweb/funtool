import { describe, expect, it } from 'vitest';
import { trim } from '../trim';

describe('trim', () => {
  it('removes whitespace from both ends', () => {
    expect(trim('  hello  ')).toBe('hello');
  });

  it('handles empty string', () => {
    expect(trim('')).toBe('');
  });
  
  it('handles tabs and newlines', () => {
    expect(trim('\thello\n')).toBe('hello');
  });
});