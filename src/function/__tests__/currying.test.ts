import { describe, it, expect } from 'vitest';
import { currying } from '../currying';

describe('currying', () => {
  it('manually calls .value()', () => {
    const join = currying({
      fn: (...args: string[]) => args.join('-')
    });

    expect(join('a')('b', 'c')('d').value()).toBe('a-b-c-d');
  });

  it('automatically executes when done is met', () => {
    const sum = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a + b, 0),
      done: args => args.length >= 3
    });

    expect(sum(1)(2)(3)).toBe(6); // auto executed
  });

  it('does not auto-execute if done is not satisfied', () => {
    const sum = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a + b, 0),
      done: args => args.length >= 5
    });

    const curried = sum(1)(2)(3); // won't auto-execute
    expect(typeof curried).toBe('function');
    expect(curried(4)(5)).toBe(15);
  });

  it('resets after execution', () => {
    const count = currying({
      fn: (...args: any[]) => args.length
    });

    count(1)(2).value();
    expect(count(3).value()).toBe(1); // args should be reset
  });

  it('supports implicit conversion (toString / valueOf)', () => {
    const product = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a * b, 1)
    });

    const curried = product(2)(3)(4);
    expect(+curried).toBe(24);
    expect(`${curried}`).toBe('24');
  });

  it('supports .map()', () => {
    const sum = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a + b, 0)
    });

    const result = sum(1)(2)(3).map(x => x * 2).value(); // (2, 4, 6) => 12
    expect(result).toBe(12);
  });

  it('supports .filter()', () => {
    const sum = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a + b, 0)
    });

    const result = sum(1)(2)(3)(4).filter(x => x % 2 === 0).value(); // (2, 4) => 6
    expect(result).toBe(6);
  });

  it('chained .map().filter().value()', () => {
    const sum = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a + b, 0)
    });

    const result = sum(1)(2)(3)(4)
      .map(x => x * 2)        // (2, 4, 6, 8)
      .filter(x => x > 4)     // (6, 8)
      .value();               // 14

    expect(result).toBe(14);
  });

  it('handles empty input safely', () => {
    const sum = currying({
      fn: (...args: number[]) => args.reduce((a, b) => a + b, 0)
    });

    expect(sum.value()).toBe(0);
  });
});
