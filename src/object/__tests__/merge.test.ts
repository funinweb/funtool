import { describe, it, expect } from 'vitest';
import { merge, mergeDeep } from '../merge';

describe('merge', () => {
  // 测试基本对象合并
  it('should merge two basic objects', () => {
    const target = { a: 1, b: 2 };
    const source = { b: 3, c: 4 };
    const result = merge(target, source);
    expect(result).toEqual({ a: 1, b: 3, c: 4 });
  });

  // 测试合并包含 Symbol 键的对象
  it('should merge objects with symbol keys', () => {
    const sym = Symbol('id');
    const target = { a: 1 };
    const source = { [sym]: 2 };
    const result = merge(target, source);
    expect(result.a).toBe(1);
    expect(result[sym]).toBe(2);
  });

  // 测试合并空对象
  it('should handle merging with an empty object', () => {
    const target = { a: 1 };
    const source = {};
    const result = merge(target, source);
    expect(result).toEqual({ a: 1 });
  });

  // 测试合并到空对象
  it('should handle merging into an empty object', () => {
    const target = {};
    const source = { a: 1 };
    const result = merge(target, source);
    expect(result).toEqual({ a: 1 });
  });
});

describe('mergeDeep', () => {
  // 测试深度合并嵌套对象
  it('should deeply merge nested objects', () => {
    const target = { user: { name: 'Alice', hobbies: [{ sport: 'tennis' }] } };
    const source = { user: { age: 30, hobbies: [{ level: 'pro' }] } };
    const result = mergeDeep(target, source);
    expect(result).toEqual({ 
      user: { 
        name: 'Alice', 
        age: 30, 
        hobbies: [{ sport: 'tennis', level: 'pro' }] 
      } 
    });
  });

  // 测试深度合并数组
  it('should deeply merge arrays', () => {
    const target = [1, { a: 2 }];
    const source = [3, { b: 4 }];
    const result = mergeDeep(target, source);
    expect(result).toEqual([3, { a: 2, b: 4 }]);
  });

  // 测试合并包含基本类型的对象
  it('should overwrite primitive values', () => {
    const target = { a: 1 };
    const source = { a: 2 };
    const result = mergeDeep(target, source);
    expect(result).toEqual({ a: 2 });
  });

  // 测试合并包含 Symbol 键的嵌套对象
  it('should deeply merge objects with symbol keys', () => {
    const sym = Symbol('key');
    const target = { obj: { [sym]: 1 } };
    const source = { obj: { [sym]: 2 } };
    const result = mergeDeep(target, source);
    expect(result.obj[sym]).toBe(2);
  });

  // 测试合并空对象
  it('should handle merging with an empty object', () => {
    const target = { a: 1 };
    const source = {};
    const result = mergeDeep(target, source);
    expect(result).toEqual({ a: 1 });
  });

  // 测试合并到空对象
  it('should handle merging into an empty object', () => {
    const target = {};
    const source = { a: 1 };
    const result = mergeDeep(target, source);
    expect(result).toEqual({ a: 1 });
  });
});