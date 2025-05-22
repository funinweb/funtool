import { describe, it, expect, vi } from 'vitest';
import { cloneDeep, cloneDeepWith } from '../cloneDeep';

describe('cloneDeep', () => {
  // 测试基本类型
  it('should return original value for primitives', () => {
    const values = [null, undefined, 123, 'string', true, Symbol('test')];
    values.forEach(value => {
      const clonedValue = cloneDeep(value);
      expect(clonedValue).toBe(value);
    });
  });

  // 测试函数
  it('should return original function and log warning', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const func = () => {};
    const clonedFunc = cloneDeep(func);
    expect(clonedFunc).toBe(func);
    expect(consoleWarnSpy).toHaveBeenCalledTimes(0);
    consoleWarnSpy.mockRestore();
  });

  // 测试对象
  it('should deep clone objects', () => {
    const obj = { a: 1, b: { c: 2 } };
    const clonedObj = cloneDeep(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
  });

  // 测试数组
  it('should deep clone arrays', () => {
    const arr = [1, { a: 2 }, [3]];
    const clonedArr = cloneDeep(arr);
    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
    expect(clonedArr[1]).not.toBe(arr[1]);
    expect(clonedArr[2]).not.toBe(arr[2]);
  });

  // 测试 Map
  it('should deep clone Map', () => {
    const map = new Map<string, any>([['a', 1], ['b', { c: 2 }]]);
    const clonedMap = cloneDeep(map);
    expect(clonedMap).not.toBe(map);
    expect(clonedMap.get('b')).not.toBe(map.get('b'));
    expect(clonedMap.get('b')).toEqual(map.get('b'));
  });

  // 测试 Set
  it('should deep clone Set', () => {
    const set = new Set([1, { a: 2 }]);
    const clonedSet = cloneDeep(set);
    expect(clonedSet).not.toBe(set);
    const originalValues = Array.from(set.values());
    const clonedValues = Array.from(clonedSet.values());
    expect(clonedValues[1]).not.toBe(originalValues[1]);
    expect(clonedValues[1]).toEqual(originalValues[1]);
  });

  // 测试循环引用
  it('should handle circular references', () => {
    const obj: any = {};
    obj.self = obj;
    const clonedObj = cloneDeep(obj);
    expect(clonedObj.self).toBe(clonedObj);
  });
});

describe('cloneDeepWith', () => {
  it('should deep clone with customizer', () => {
    const original = { x: new Date(), y: 123 };
    const copy = cloneDeepWith(original, (val) => {
      if (val instanceof Date) return 'DATE';
    });
    expect(copy.x).toBe('DATE');
    expect(copy.y).toBe(123);
  });

  it('should fallback to default cloneDeep if customizer returns undefined', () => {
    const original = { a: 1, b: { c: 2 } };
    const copy = cloneDeepWith(original, () => undefined);
    expect(copy).toEqual(original);
    expect(copy.b).not.toBe(original.b);
  });
});