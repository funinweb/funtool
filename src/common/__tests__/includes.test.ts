import { describe, it, expect } from 'vitest';
import { includes } from '../includes';

describe('includes', () => {
  // 测试数组
  it('should return true when target is in array', () => {
    const arr = [1, 2, 3];
    expect(includes(arr, 2)).toBe(true);
  });

  it('should return false when target is not in array', () => {
    const arr = [1, 2, 3];
    expect(includes(arr, 4)).toBe(false);
  });

  it('should respect fromIndex in array', () => {
    const arr = [1, 2, 3];
    expect(includes(arr, 2, 2)).toBe(false);
  });

  // 测试字符串
  it('should return true when target is in string', () => {
    const str = 'hello world';
    expect(includes(str, 'world')).toBe(true);
  });

  it('should return false when target is not in string', () => {
    const str = 'hello world';
    expect(includes(str, 'foo')).toBe(false);
  });

  it('should respect fromIndex in string', () => {
    const str = 'hello world';
    expect(includes(str, 'world', 8)).toBe(false);
  });

  // 测试对象
  it('should return true when target is in object values', () => {
    const obj = { a: 1, b: 2 };
    expect(includes(obj, 2)).toBe(true);
  });

  it('should return false when target is not in object values', () => {
    const obj = { a: 1, b: 2 };
    expect(includes(obj, 3)).toBe(false);
  });

  // 测试 Map
  it('should return true when target is a key in Map', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    expect(includes(map, 'b')).toBe(true);
  });

  it('should return false when target is not a key in Map', () => {
    const map = new Map([['a', 1], ['b', 2]]);
    expect(includes(map, 'c')).toBe(false);
  });

  // 测试 Set
  it('should return true when target is in Set', () => {
    const set = new Set([1, 2, 3]);
    expect(includes(set, 2)).toBe(true);
  });

  it('should return false when target is not in Set', () => {
    const set = new Set([1, 2, 3]);
    expect(includes(set, 4)).toBe(false);
  });

  // 测试边界情况
  it('should handle empty array', () => {
    const arr: number[] = [];
    expect(includes(arr, 1)).toBe(false);
  });

  it('should handle empty string', () => {
    const str = '';
    expect(includes(str, 'a')).toBe(false);
  });

  it('should handle empty object', () => {
    const obj = {};
    expect(includes(obj, 1)).toBe(false);
  });

  it('should handle empty Map', () => {
    const map = new Map();
    expect(includes(map, 'a')).toBe(false);
  });

  it('should handle empty Set', () => {
    const set = new Set();
    expect(includes(set, 1)).toBe(false);
  });

  it('should handle fromIndex larger than array length', () => {
    const arr = [1, 2, 3];
    expect(includes(arr, 2, 10)).toBe(false);
  });

  it('should handle fromIndex larger than string length', () => {
    const str = 'hello';
    expect(includes(str, 'l', 10)).toBe(false);
  });
});