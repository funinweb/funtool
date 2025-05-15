import { describe, it, expect } from 'vitest';
import { isSymbol } from '../isSymbol';

describe('isSymbol', () => {
  it('should return true for Symbol objects', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol('description'))).toBe(true);
  });

  it('should return false for non-Symbol objects', () => {
    expect(isSymbol('not a symbol')).toBe(false);
    expect(isSymbol({})).toBe(false);
    expect(isSymbol([])).toBe(false);
    expect(isSymbol(123)).toBe(false);
  });
});