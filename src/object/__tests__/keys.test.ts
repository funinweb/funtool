import { describe, it, expect } from 'vitest';
import { keys } from '../keys';

describe('keys', () => {
  // 测试普通对象
  it('should return keys of a plain object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(keys(obj)).toEqual(['a', 'b', 'c']);
  });

  // 测试空对象
  it('should return an empty array for an empty object', () => {
    const obj = {};
    expect(keys(obj)).toEqual([]);
  });

  // 测试包含继承属性的对象
  it('should not include inherited properties', () => {
    const Parent = function() {
      this.a = 1;
    };
    Parent.prototype.b = 2;
    const child = new Parent();
    expect(keys(child)).toEqual(['a']);
  });

  // 测试包含特殊属性名的对象
  it('should handle special property names', () => {
    const obj = { '123': 'number', 'key with space': 'value' };
    expect(keys(obj)).toEqual(['123', 'key with space']);
  });

  // 测试非对象参数
  it('should return an empty array for non - object parameters', () => {
    const values = [null, undefined, 123, 'string', true, Symbol('test')];
    values.forEach(value => {
      expect(keys(value as unknown as object)).toEqual([]);
    });
  });

  // 测试属性名为原型方法名的对象
  it('should handle property named as prototype method', () => {
    const obj = { toString: 'test' };
    expect(keys(obj)).toEqual(['toString']);
  });
});