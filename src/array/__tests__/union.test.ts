import { describe, it, expect } from 'vitest';
import { union } from '../union';

describe('union', () => {
  // 测试两个数组的并集
  it('should return union of two arrays', () => {
    const arr1 = [1, 2];
    const arr2 = [2, 3];
    expect(union(arr1, arr2)).toEqual([1, 2, 3]);
  });

  // 测试无重复元素的并集
  it('should handle arrays with no duplicates', () => {
    const arr1 = ['a', 'b'];
    const arr2 = ['c', 'd'];
    expect(union(arr1, arr2)).toEqual(['a', 'b', 'c', 'd']);
  });

  // 测试包含重复元素的并集
  it('should remove duplicates in union', () => {
    const arr1 = [1, 1, 2];
    const arr2 = [2, 3, 3];
    expect(union(arr1, arr2)).toEqual([1, 2, 3]);
  });

  // 测试空数组
  it('should return the other array if one array is empty', () => {
    const arr1: number[] = [];
    const arr2 = [1, 2, 3];
    expect(union(arr1, arr2)).toEqual([1, 2, 3]);
    expect(union(arr2, arr1)).toEqual([1, 2, 3]);
  });
});