import { describe, it, expect } from 'vitest';
import { parseQueryDeep, parseQueryDeepWith } from '../parseQueryDeep';

describe('parseQueryDeep', () => {
  it('should serialize nested objects', () => {
    expect(parseQueryDeep({ user: { name: 'Tom' } }))
      .toBe('user[name]=Tom');
  });

  it('should handle arrays', () => {
    expect(parseQueryDeep({ ids: [1, 2] }))
      .toBe('ids[]=1&ids[]=2');
  });

  it('should combine nested structures', () => {
    expect(parseQueryDeep({ 
      user: { name: 'Tom', roles: ['admin'] },
      page: 1
    })).toBe('user[name]=Tom&user[roles][]=admin&page=1');
  });
});

describe('parseQueryDeepWith', () => {
  it('should use custom path builder', () => {
    const dotBuilder = (path: string[]) => path.join('.');
    expect(parseQueryDeepWith({ user: { name: 'Tom' } }, dotBuilder))
      .toBe('user.name=Tom');
  });
});