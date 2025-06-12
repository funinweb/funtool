import { describe, it, expect } from 'vitest';
import { parseQuery, parseQueryWith } from '../parseQuery';

describe('parseQuery', () => {
  it('should serialize flat object to query string', () => {
    expect(parseQuery({ name: 'Tom', age: 20 })).toBe('name=Tom&age=20');
    expect(parseQuery({ city: '北京' })).toBe('city=%E5%8C%97%E4%BA%AC');
  });

  it('should ignore null/undefined values', () => {
    expect(parseQuery({ a: 1, b: null, c: undefined })).toBe('a=1');
  });
});

describe('parseQueryWith', () => {
  it('should use custom serializer', () => {
    const serializer = (k: string, v: any) => 
      v == null ? null : `${k.toUpperCase()}=${v}`;
    expect(parseQueryWith({ a: 1, b: null }, serializer))
      .toBe('A=1');
  });
});