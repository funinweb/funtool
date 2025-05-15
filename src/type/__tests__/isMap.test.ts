import { describe, it, expect } from 'vitest';
import { isMap } from '../isMap';

describe('isMap', () => {
  it('should return true for Map objects', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([['key', 'value']]))).toBe(true);
  });

  it('should return false for non-Map objects', () => {
    expect(isMap({})).toBe(false);
    expect(isMap([])).toBe(false);
    expect(isMap('not a map')).toBe(false);
    expect(isMap(123)).toBe(false);
  });
});