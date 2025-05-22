import { describe, it, expect } from 'vitest';
import { clone, cloneWith } from '../clone';

describe('clone', () => {
  // 测试基本类型
  it('should return original value for primitives', () => {
    const values = [null, undefined, 123, 'string', true, Symbol('test')];
    values.forEach(value => {
      const clonedValue = clone(value);
      expect(clonedValue).toBe(value);
    });
  });

  // 测试数组
  it('should shallow clone arrays', () => {
    const arr = [1, { a: 2 }, [3]];
    const clonedArr = clone(arr);
    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
    expect(clonedArr[1]).toBe(arr[1]);
  });

  // 测试 Date 对象
  it('should clone Date objects', () => {
    const date = new Date('2020-01-01');
    const clonedDate = clone(date);
    expect(clonedDate).toEqual(date);
    expect(clonedDate).not.toBe(date);
    expect(clonedDate.getTime()).toBe(date.getTime());
  });

  // 测试 RegExp 对象
  it('should clone RegExp objects', () => {
    const regex = /abc/gi;
    const clonedRegex = clone(regex);
    expect(clonedRegex).toEqual(regex);
    expect(clonedRegex).not.toBe(regex);
    expect(clonedRegex.source).toBe(regex.source);
    expect(clonedRegex.flags).toBe(regex.flags);
  });

  // 测试 Map 对象
  it('should shallow clone Map objects', () => {
    const map = new Map<string, any>([['a', 1], ['b', { c: 2 }]]);
    const clonedMap = clone(map);
    expect(clonedMap).not.toBe(map);
    expect(clonedMap.size).toBe(map.size);
    expect(clonedMap.get('b')).toBe(map.get('b'));
  });

  // 测试 Set 对象
  it('should shallow clone Set objects', () => {
    const set = new Set([1, { a: 2 }]);
    const clonedSet = clone(set);
    expect(clonedSet).not.toBe(set);
    expect(clonedSet.size).toBe(set.size);
    const originalValues = Array.from(set.values());
    const clonedValues = Array.from(clonedSet.values());
    expect(clonedValues[1]).toBe(originalValues[1]);
  });

  // 测试普通对象
  it('should shallow clone plain objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clonedObj = clone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).toBe(obj.b);
  });
});

describe('cloneWith', () => {
  it('should clone with customizer', () => {
    const obj = { a: 1, b: 2 };
    const result = cloneWith(obj, (val) => typeof val === 'number' ? val + 1 : undefined);
    expect(result).toEqual({ a: 2, b: 3 });
  });

  it('should fallback to default clone if customizer returns undefined', () => {
    const obj = { a: 1, b: { c: 2 } };
    const result = cloneWith(obj, () => undefined);
    expect(result).toEqual(obj);
    expect(result.b).toBe(obj.b);
  });
});