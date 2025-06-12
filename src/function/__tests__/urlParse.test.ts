import { describe, it, expect } from 'vitest';
import { urlParse } from '../urlParse';

describe('urlParse', () => {
  it('should parse full URL', () => {
    const url = 'https://example.com:8080/path?a=1&b=true#section';
    const parsed = urlParse(url);
    
    expect(parsed.protocol).toBe('https:');
    expect(parsed.hostname).toBe('example.com');
    expect(parsed.port).toBe('8080');
    expect(parsed.pathname).toBe('/path');
    expect(parsed.query.a).toBe(1);
    expect(parsed.query.b).toBe(true);
    expect(parsed.hash).toBe('#section');
  });

  it('should parse query with arrays', () => {
    const parsed = urlParse('http://test.com/?a=1&a=2');
    expect(Array.isArray(parsed.query.a)).toBe(true);
    expect(parsed.query.a).toEqual([1, 2]);
  });
});