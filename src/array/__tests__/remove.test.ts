import { describe, it, expect } from 'vitest';
import { remove } from '../remove';

describe('remove', () => {
  // 测试移除指定元素
  it('should remove specified values from array', () => {
    const arr = [1, 2, 3, 4];
    const valuesToRemove = [2, 4];
    expect(remove(arr, valuesToRemove)).toEqual([1, 3]);
  });

  // 测试移除不存在的元素
  it('should return original array if no values to remove', () => {
    const arr = [1, 2, 3];
    const valuesToRemove: number[] = [];
    expect(remove(arr, valuesToRemove)).toEqual([1, 2, 3]);
  });

  // 测试移除所有元素
  it('should return empty array if all values are removed', () => {
    const arr = [1, 2, 3];
    const valuesToRemove = [1, 2, 3];
    expect(remove(arr, valuesToRemove)).toEqual([]);
  });

  // 测试空数组
  it('should return empty array if input array is empty', () => {
    const arr: number[] = [];
    const valuesToRemove = [1, 2, 3];
    expect(remove(arr, valuesToRemove)).toEqual([]);
  });
});