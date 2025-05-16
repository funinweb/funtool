import { describe, expect, it } from 'vitest';
import { toLowerCase } from '../toLowerCase';

describe('toLowerCase', () => {
  it('converts string to lowercase', () => {
    expect(toLowerCase('Hello')).toBe('hello');
  });

  it('handles already lowercase strings', () => {
    expect(toLowerCase('hello')).toBe('hello');
  });

  it('handles mixed case strings', () => {
    expect(toLowerCase('HeLLo WoRLd')).toBe('hello world');
  });

  it('handles empty string', () => {
    expect(toLowerCase('')).toBe('');
  });
});