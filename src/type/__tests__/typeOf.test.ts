import { describe, it, expect } from 'vitest';
import { typeOf } from '../typeOf';

describe('typeOf', () => {
  it('should return "number" for numbers', () => {
    expect(typeOf(123)).toBe('number');
    expect(typeOf(NaN)).toBe('number');
  });

  it('should return "string" for strings', () => {
    expect(typeOf('hello')).toBe('string');
  });

  it('should return "boolean" for booleans', () => {
    expect(typeOf(true)).toBe('boolean');
    expect(typeOf(false)).toBe('boolean');
  });

  it('should return "undefined" for undefined', () => {
    expect(typeOf(undefined)).toBe('undefined');
  });

  it('should return "null" for null', () => {
    expect(typeOf(null)).toBe('null');
  });

  it('should return "object" for plain objects', () => {
    expect(typeOf({})).toBe('object');
    expect(typeOf({ a: 1 })).toBe('object');
  });

  it('should return "array" for arrays', () => {
    expect(typeOf([])).toBe('array');
    expect(typeOf([1, 2, 3])).toBe('array');
  });

  it('should return "function" for functions', () => {
    expect(typeOf(() => {})).toBe('function');
    expect(typeOf(function () {})).toBe('function');
  });

  it('should return "symbol" for symbols', () => {
    expect(typeOf(Symbol('sym'))).toBe('symbol');
  });

  it('should return "bigint" for bigint values', () => {
    expect(typeOf(BigInt(10))).toBe('bigint');
  });
});
