import { describe, it, expect } from 'vitest';
import { hasOwn } from '../hasOwn';

describe('hasOwn', () => {
  // 测试对象自身拥有的属性
  it('should return true for own properties', () => {
    const obj = { a: 1, b: 2 };
    expect(hasOwn(obj, 'a')).toBe(true);
    expect(hasOwn(obj, 'b')).toBe(true);
  });

  // 测试对象不拥有的属性
  it('should return false for non - own properties', () => {
    const obj = { a: 1, b: 2 };
    expect(hasOwn(obj, 'c')).toBe(false);
  });

  // 测试继承属性
  it('should return false for inherited properties', () => {
    const Parent = function() {
      this.a = 1;
    };
    Parent.prototype.b = 2;
    const child = new Parent();
    expect(hasOwn(child, 'a')).toBe(true);
    expect(hasOwn(child, 'b')).toBe(false);
  });

  // 测试空对象
  it('should return false for empty object', () => {
    const obj = {};
    expect(hasOwn(obj, 'a')).toBe(false);
  });

  // 测试非对象类型
  it('should return false for non - object types', () => {
    const values = [123, 'string', true, Symbol('test')];
    values.forEach(value => {
      expect(hasOwn(value as unknown as object, 'a')).toBe(false);
    });
  });

  // 测试属性名为原型方法名
  it('should return true for property named as prototype method', () => {
    const obj = { toString: 'test' };
    expect(hasOwn(obj, 'toString')).toBe(true);
  });

  // 测试 Symbol 键
  it('should correctly check for Symbol keys', () => {
    const symbolKey = Symbol('test');
    const obj = { [symbolKey]: 'value' };

    expect(hasOwn(obj, symbolKey)).toBe(true);

    const nonExistentSymbol = Symbol('non-existent');
    expect(hasOwn(obj, nonExistentSymbol)).toBe(false);
  });
});