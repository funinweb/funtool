import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce, debounceSync } from '../debounce';

describe('debounce (async)', () => {
  let clock: ReturnType<typeof vi.useFakeTimers>;

  beforeEach(() => {
    clock = vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce async calls and resolve with result', async () => {
    const fn = vi.fn((x: number) => x * 2);
    const debounced = debounce(fn, 100);

    const p1 = debounced(1);
    const p2 = debounced(2);
    expect(fn).not.toHaveBeenCalled();

    clock.advanceTimersByTime(100);

    const res = await p2;
    expect(res).toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('should bind this correctly', async () => {
    const obj = {
      x: 10,
      fn(this: typeof obj, y: number) {
        return this.x + y;
      },
    };
    const debounced = debounce(obj.fn, 100);
    const promise = debounced.call(obj, 5);

    clock.advanceTimersByTime(100);

    const res = await promise;
    expect(res).toBe(15);
  });

  it('cancel should reject the pending promise', async () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 100);

    const promise = debounced(1);
    debounced.cancel();

    await expect(promise).rejects.toBe('Debounced call canceled');
    expect(fn).not.toHaveBeenCalled();
  });

  it('flush should immediately invoke the function', async () => {
    const fn = vi.fn((v: number) => v + 1);
    const debounced = debounce(fn, 100);

    const promise = debounced(10);
    const flushPromise = debounced.flush();

    expect(fn).toHaveBeenCalledWith(10);
    expect(debounced.pending()).toBe(false);

    const res = await flushPromise;
    expect(res).toBe(11);
    await expect(promise).resolves.toBe(11);
  });

  it('pending should return true when waiting, false otherwise', () => {
    const fn = () => {};
    const debounced = debounce(fn, 100);
    expect(debounced.pending()).toBe(false);

    debounced();
    expect(debounced.pending()).toBe(true);

    vi.advanceTimersByTime(100);
    expect(debounced.pending()).toBe(false);
  });
});

describe('debounceSync', () => {
  let clock: ReturnType<typeof vi.useFakeTimers>;

  beforeEach(() => {
    clock = vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce sync calls', () => {
    const fn = vi.fn();
    const debounced = debounceSync(fn, 100);

    debounced(1);
    debounced(2);
    expect(fn).not.toHaveBeenCalled();

    clock.advanceTimersByTime(100);

    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(2);
  });

  it('should bind this correctly', () => {
    const obj = {
      val: 5,
      fn(this: typeof obj, n: number) {
        return this.val + n;
      },
    };

    const spy = vi.spyOn(obj, 'fn');
    const debounced = debounceSync(obj.fn, 100);

    debounced.call(obj, 10);

    clock.advanceTimersByTime(100);
    debounced.call(obj, 10);
    clock.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledWith(10);
    spy.mockRestore();
  });

  it('cancel should cancel pending call', () => {
    const fn = vi.fn();
    const debounced = debounceSync(fn, 100);

    debounced(1);
    debounced.cancel();

    clock.advanceTimersByTime(100);

    expect(fn).not.toHaveBeenCalled();
  });

  it('flush should immediately invoke the function', () => {
    const fn = vi.fn();
    const debounced = debounceSync(fn, 100);

    debounced(42);
    expect(debounced.pending()).toBe(true);

    const res = debounced.flush();

    expect(fn).toHaveBeenCalledWith(42);
    expect(debounced.pending()).toBe(false);
    expect(res).toBeUndefined(); // 因为 fn 返回 void
  });

  it('pending returns true or false', () => {
    const fn = () => {};
    const debounced = debounceSync(fn, 100);
    expect(debounced.pending()).toBe(false);

    debounced();
    expect(debounced.pending()).toBe(true);

    clock.advanceTimersByTime(100);
    expect(debounced.pending()).toBe(false);
  });
});
