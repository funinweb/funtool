import { describe, it, expect } from 'vitest';
import { randomInt, randomFloat } from '../random';

describe('randomInt', () => {
  it('should return an integer within the given range', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomInt(1, 5);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(5);
      expect(Number.isInteger(result)).toBe(true);
    }
  });
});

describe('randomFloat', () => {
  it('should return a float within the given range', () => {
    for (let i = 0; i < 100; i++) {
      const result = randomFloat(1.5, 5.5);
      expect(result).toBeGreaterThanOrEqual(1.5);
      expect(result).toBeLessThan(5.5);
    }
  });
});
