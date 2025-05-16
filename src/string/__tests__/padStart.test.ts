import { describe, it, expect } from 'vitest';
import { padStart } from '../padStart';

describe('padStart', () => {
  it('should pad the start of the string', () => {
    expect(padStart('test', 8, '_')).toBe('____test');
  });

  it('should not pad if already longer', () => {
    expect(padStart('longstring', 5, '_')).toBe('longstring');
  });
});
