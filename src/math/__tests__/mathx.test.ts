import { describe, it, expect } from 'vitest';
import { MathX } from '../mathx';
import { currying } from '../../function/currying';

// ... existing code ...

describe('Math advanced test cases', () => {
  it('should handle very small numbers with high precision', () => {
    const mx = new MathX(0.000000123456789).setPrecision(10);
    expect(mx.value()).toBeCloseTo(0.0000001235, 10);
  });

  it('should handle very large numbers', () => {
    const mx = new MathX(1.23456789e20).setPrecision(2);
    console.log(mx.value())
    expect(mx.value()).toBeCloseTo(1.23e20, 2);
  });

  it('should handle precision change during chaining', () => {
    const result = new MathX(1.23456789)
      .setPrecision(2)
      .pow(2)
      .setPrecision(4)
      .value();
    expect(result).toBeCloseTo(1.5242, 4);
  });

  it('should handle multiple rounding mode changes', () => {
    const result = new MathX(1.2345)
      .setRounding('up')
      .setPrecision(2)
      .value();
    expect(result).toBe(1.24);

    const result2 = new MathX(1.2345)
      .setRounding('down')
      .setPrecision(2)
      .value();
    expect(result2).toBe(1.23);
  });

  it('should handle complex chained operations', () => {
    const result = new MathX(45)
      .degToRad()
      .sin()
      .pow(2)
      .add(new MathX(45).degToRad().cos().pow(2).value())
      .value();
    expect(result).toBeCloseTo(1, 10);
  });

  it('should handle edge cases for trigonometric functions', () => {
    expect(new MathX(0).sin().value()).toBe(0);
    expect(new MathX(Math.PI/2).sin().value()).toBeCloseTo(1, 10);
    expect(new MathX(Math.PI).cos().value()).toBeCloseTo(-1, 10);
  });

  it('should handle logarithmic edge cases', () => {
    expect(new MathX(0).log().value()).toBe(-Infinity);
    expect(new MathX(1).log().value()).toBe(0);
    expect(new MathX(0).log10().value()).toBe(-Infinity);
    expect(new MathX(1).log10().value()).toBe(0);
  });

  it('should handle exponential edge cases', () => {
    expect(new MathX(0).exp().value()).toBe(1);
    expect(new MathX(1).setPrecision(10).exp().value()).toBeCloseTo(Math.E, 10);
    expect(new MathX(-Infinity).exp().value()).toBe(0);
  });

  it('should handle power edge cases', () => {
    expect(new MathX(0).pow(0).value()).toBe(1);
    expect(new MathX(0).pow(1).value()).toBe(0);
    expect(new MathX(1).pow(Infinity).value()).toBe(1);
  });

  it('should handle clone with all properties', () => {
    const mx1 = new MathX(5)
      .setPrecision(5)
      .setRounding('up');
    const mx2 = mx1.clone();
    
    expect(mx2.value()).toBe(5);
    expect(mx2['_precision']).toBe(5);
    expect(mx2['_rounding']).toBe('up');
  });
});

// ... existing code ...

describe('Math combined with currying', () => {
  const mx = new MathX().setPrecision(3).setRounding('half-up');

  it('curry add with Math precision', () => {
    const add = currying({fn:(a: number, b: number) => mx.set(a + b).value()});
    expect(add(0.1)(0.2).value()).toBe(0.3);
  });

  it('curry multiply with Math precision', () => {
    const mul = currying({fn:(a: number, b: number) => mx.set(a * b).value()});
    expect(mul(0.1)(0.2).value()).toBe(0.02);
  });

  it('curry divide with Math precision', () => {
    const div = currying({fn:(a: number, b: number) => mx.set(a / b).value()});
    expect(div(1)(3).value()).toBe(0.333);
  });

  it('complex expression with curry', () => {
    const expr = currying({fn:(a: number, b: number, c: number) => mx.set(a + b * c).value()});
    expect(expr(0.1)(0.2)(0.3).value()).toBe(0.16); // 0.1 + 0.2 * 0.3 = 0.1 + 0.06 = 0.16
  });

  it('curry pow with Math precision', () => {
    const pow = currying({fn:(a: number, b: number) => mx.set(Math.pow(a, b)).value()});
    expect(pow(2)(3).value()).toBe(8);
  });
});
