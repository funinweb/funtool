import { describe, expect, it } from 'vitest';
import { toUpperCase } from '../toUpperCase';

describe('toUpperCase', () => {
  it('converts string to uppercase', () => {
    expect(toUpperCase('hello')).toBe('HELLO');
  });

  it('handles already uppercase strings', () => {
    expect(toUpperCase('HELLO')).toBe('HELLO');
  });

  it('handles mixed case strings', () => {
    expect(toUpperCase('HeLLo WoRLd')).toBe('HELLO WORLD');
  });

  it('handles empty string', () => {
    expect(toUpperCase('')).toBe('');
  });
});