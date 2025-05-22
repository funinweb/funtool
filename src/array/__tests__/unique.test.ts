import { describe, it, expect } from 'vitest';
import { unique } from '../unique';

describe('unique', () => {
  // 测试移除重复元素
  it('should remove duplicate values from array', () => {
    const arr = [1, 2, 2, 3, 3, 3];
    expect(unique(arr)).toEqual([1, 2, 3]);
  });

  // 测试无重复元素的数组
  it('should return original array if no duplicates', () => {
    const arr = ['a', 'b', 'c'];
    expect(unique(arr)).toEqual(['a', 'b', 'c']);
  });

  // 测试空数组
  it('should return empty array for empty input', () => {
    const arr: number[] = [];
    expect(unique(arr)).toEqual([]);
  });

  // 测试包含不同类型元素的数组
  it('should handle array with different types', () => {
    const arr = [1, 'a', 1, 'b', 'a'];
    expect(unique(arr)).toEqual([1, 'a', 'b']);
  });
});