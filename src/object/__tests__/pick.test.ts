import { describe, it, expect } from 'vitest';
import { pick, pickBy } from '../pick';

describe('pick', () => {
  // 测试正常挑选属性
  it('should pick specified keys from an object', () => {
    const user = { name: 'Alice', age: 25, password: 'secret' };
    const result = pick(user, ['name', 'age']);
    expect(result).toEqual({ name: 'Alice', age: 25 });
  });

  // 测试挑选不存在的属性
  it('should ignore non - existent keys', () => {
    const user = { name: 'Alice', age: 25 };
    const result = pick(user, ['name', 'email']);
    expect(result).toEqual({ name: 'Alice' });
  });

  // 测试空对象
  it('should return an empty object when source is empty', () => {
    const obj = {};
    const result = pick(obj, ['key']);
    expect(result).toEqual({});
  });

  // 测试空键数组
  it('should return an empty object when keys array is empty', () => {
    const user = { name: 'Alice', age: 25 };
    const result = pick(user, []);
    expect(result).toEqual({});
  });
});

describe('pickBy', () => {
  // 测试根据谓词函数挑选属性
  it('should pick properties that satisfy the predicate', () => {
    const user = { name: 'Alice', age: 25, isActive: false };
    const result = pickBy(user, (value) => Boolean(value));
    expect(result).toEqual({ name: 'Alice', age: 25 });
  });

  // 测试谓词函数始终返回 false
  it('should return an empty object if predicate always returns false', () => {
    const user = { name: 'Alice', age: 25 };
    const result = pickBy(user, () => false);
    expect(result).toEqual({});
  });

  // 测试空对象
  it('should return an empty object when source is empty', () => {
    const obj = {};
    const result = pickBy(obj, (value) => true);
    expect(result).toEqual({});
  });
});