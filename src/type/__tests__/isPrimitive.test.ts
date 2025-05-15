import { describe, it, expect } from 'vitest';
import { isPrimitive } from '../isPrimitive';

describe('isPrimitive', () => {
  it('should return true for primitive values', () => {
    expect(isPrimitive(123)).toBe(true);
    expect(isPrimitive('string')).toBe(true);
    expect(isPrimitive(true)).toBe(true);
    expect(isPrimitive(null)).toBe(true);
    expect(isPrimitive(undefined)).toBe(true);
    expect(isPrimitive(Symbol())).toBe(true);
  });

  it('should return false for non-primitive values', () => {
    expect(isPrimitive({})).toBe(false);
    expect(isPrimitive([])).toBe(false);
    expect(isPrimitive(() => {})).toBe(false);
    expect(isPrimitive(new Date())).toBe(false);
  });
});