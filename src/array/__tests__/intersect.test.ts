import { describe, it, expect } from 'vitest';
import { intersect } from '../intersect';

describe('intersect', () => {
  // 测试有交集的数组
  it('should return intersection of two arrays', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [2, 3, 4];
    expect(intersect(arr1, arr2)).toEqual([2, 3]);
  });

  // 测试无交集的数组
  it('should return empty array for no intersection', () => {
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    expect(intersect(arr1, arr2)).toEqual([]);
  });

  // 测试包含重复元素的数组
  it('should handle arrays with duplicate elements', () => {
    const arr1 = [1, 2, 2, 3];
    const arr2 = [2, 2, 4];
    expect(intersect(arr1, arr2)).toEqual([2, 2]);
  });

  // 测试空数组
  it('should return empty array if one array is empty', () => {
    const arr1: number[] = [];
    const arr2 = [1, 2, 3];
    expect(intersect(arr1, arr2)).toEqual([]);
    expect(intersect(arr2, arr1)).toEqual([]);
  });
});