import { describe, it, expect } from 'vitest';
import { toLowerAt } from '../toLowerAt';

describe('toLowerAt', () => {
  it('should lowercase character at index', () => {
    expect(toLowerAt('Hello', 0)).toBe('hello');
  });

  it('should lowercase matching character', () => {
    expect(toLowerAt('Foo-Bar', 'B')).toBe('Foo-bar');
  });

  it('should return original if target not found', () => {
    expect(toLowerAt('ABC', 'z')).toBe('ABC');
  });
});
