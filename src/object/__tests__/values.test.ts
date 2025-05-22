import { describe, it, expect } from 'vitest';
import { values } from '../values';

describe('values', () => {
  // 测试普通对象
  it('should return values of a plain object', () => {
    const obj = { a: 1, b: 2, c: 3 };
    expect(values(obj)).toEqual([1, 2, 3]);
  });

  // 测试空对象
  it('should return an empty array for an empty object', () => {
    const obj = {};
    expect(values(obj)).toEqual([]);
  });

  // 测试包含继承属性的对象
  it('should not include inherited property values', () => {
    const Parent = function() {
      this.a = 1;
    };
    Parent.prototype.b = 2;
    const child = new Parent();
    expect(values(child)).toEqual([1]);
  });

  // 测试包含特殊属性名的对象
  it('should handle special property names', () => {
    const obj = { '123': 123, 'key with space': 'value' };
    expect(values(obj)).toEqual([123, 'value']);
  });

  // 测试非对象参数
  it('should return an empty array for non - object parameters', () => {
    const valuesToTest = [null, undefined, 123, 'string', true, Symbol('test')];
    valuesToTest.forEach(value => {
      expect(values(value as unknown as object)).toEqual([]);
    });
  });

  // 测试属性名为原型方法名的对象
  it('should handle property named as prototype method', () => {
    const obj = { toString: 'test' };
    expect(values(obj)).toEqual(['test']);
  });

  // 测试包含不同类型值的对象
  it('should handle different value types', () => {
    const obj = { 
      num: 123, 
      str: 'hello', 
      bool: true, 
      arr: [1, 2, 3], 
      obj: { a: 1 } 
    };
    expect(values(obj)).toEqual([123, 'hello', true, [1, 2, 3], { a: 1 }]);
  });
});