import { describe, it, expect } from 'vitest';
import { urlStringify } from '../urlStringify';

describe('urlStringify', () => {
  it('should stringify URL object', () => {
    const url = urlStringify({
      protocol: 'https',
      hostname: 'example.com',
      port: '8080',
      pathname: '/path',
      query: { a: 1, b: 'test' },
      hash: 'section'
    });
    
    expect(url).toBe('https://example.com:8080/path?a=1&b=test#section');
  });

  it('should handle array query params', () => {
    const url = urlStringify({
      hostname: 'test.com',
      query: { a: [1, 2] }
    });
    expect(url).toBe('//test.com/?a=1&a=2');
  });
});