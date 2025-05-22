import { describe, it, expect } from 'vitest';
import { omit, omitBy } from '../omit';

describe('omit', () => {
  // 测试正常忽略属性
  it('should omit specified keys from an object', () => {
    const user = { name: 'Alice', age: 25, password: 'secret' };
    const result = omit(user, ['password']);
    expect(result).toEqual({ name: 'Alice', age: 25 });
  });

  // 测试忽略不存在的属性
  it('should ignore non - existent keys', () => {
    const user = { name: 'Alice', age: 25 };
    const result = omit(user, ['email']);
    expect(result).toEqual({ name: 'Alice', age: 25 });
  });

  // 测试空对象
  it('should return an empty object when source is empty', () => {
    const obj = {};
    const result = omit(obj, ['key']);
    expect(result).toEqual({});
  });

  // 测试空键数组
  it('should return the original object when keys array is empty', () => {
    const user = { name: 'Alice', age: 25 };
    const result = omit(user, []);
    expect(result).toEqual({ name: 'Alice', age: 25 });
  });
});

describe('omitBy', () => {
  // 测试根据谓词函数忽略属性
  it('should omit properties that satisfy the predicate', () => {
    const user = { name: 'Alice', age: null, isActive: true };
    const result = omitBy(user, (value) => value === null);
    expect(result).toEqual({ name: 'Alice', isActive: true });
  });

  // 测试谓词函数始终返回 false
  it('should return the original object if predicate always returns false', () => {
    const user = { name: 'Alice', age: 25 };
    const result = omitBy(user, () => false);
    expect(result).toEqual({ name: 'Alice', age: 25 });
  });

  // 测试空对象
  it('should return an empty object when source is empty', () => {
    const obj = {};
    const result = omitBy(obj, (value) => true);
    expect(result).toEqual({});
  });
});