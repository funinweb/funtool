import { describe, it, expect } from 'vitest';
import { replaceAll } from '../replaceAll';

describe('replaceAll', () => {
  it('should replace all occurrences of target', () => {
    expect(replaceAll('a-b-c', '-', '/')).toBe('a/b/c');
  });

  it('should return original string if target not found', () => {
    expect(replaceAll('abc', 'x', 'y')).toBe('abc');
  });
});
