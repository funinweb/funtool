import { describe, it, expect } from 'vitest';
import { isPromise } from '../isPromise';

describe('isPromise', () => {
  it('should return true for Promise objects', () => {
    expect(isPromise(Promise.resolve())).toBe(true);
    expect(isPromise(new Promise(() => {}))).toBe(true);
  });

  it('should return false for non-Promise objects', () => {
    expect(isPromise({})).toBe(false);
    expect(isPromise(() => {})).toBe(false);
    expect(isPromise('not a promise')).toBe(false);
    expect(isPromise(123)).toBe(false);
  });
});