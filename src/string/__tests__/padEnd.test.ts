import { describe, it, expect } from 'vitest';
import { padEnd } from '../padEnd';

describe('padEnd', () => {
  it('should pad the end of the string', () => {
    expect(padEnd('test', 7, '.')).toBe('test...');
  });

  it('should not pad if already long enough', () => {
    expect(padEnd('testing', 5, '.')).toBe('testing');
  });
});
