import { describe, it, expect } from 'vitest';
import { at } from '../at';

describe('at', () => {
  // 测试正索引
  it('should return element at positive index', () => {
    const arr = [10, 20, 30];
    expect(at(arr, 0)).toBe(10);
    expect(at(arr, 1)).toBe(20);
    expect(at(arr, 2)).toBe(30);
  });

  // 测试负索引
  it('should return element at negative index', () => {
    const arr = [10, 20, 30];
    expect(at(arr, -1)).toBe(30);
    expect(at(arr, -2)).toBe(20);
    expect(at(arr, -3)).toBe(10);
  });

  // 测试空数组
  it('should return undefined for empty array', () => {
    const arr: number[] = [];
    expect(at(arr, 0)).toBeUndefined();
    expect(at(arr, -1)).toBeUndefined();
  });

  // 测试索引越界
  it('should return undefined for out - of - bounds index', () => {
    const arr = [10, 20, 30];
    expect(at(arr, 3)).toBeUndefined();
    expect(at(arr, -4)).toBeUndefined();
  });
});