import { describe, it, expect } from 'vitest';
import { awaitTo } from '../awaitTo';

describe('awaitTo', () => {
  it('should return [null, data] for a resolved promise', async () => {
    const promise = Promise.resolve(42);
    const [err, data] = await awaitTo(promise);
    expect(err).toBeNull();
    expect(data).toBe(42);
  });

  it('should return [error, undefined] for a rejected promise', async () => {
    const error = new Error('fail');
    const promise = Promise.reject(error);
    const [err, data] = await awaitTo(promise);
    expect(err).toBe(error);
    expect(data).toBeUndefined();
  });

  it('should work with non-promise values', async () => {
    const value = 'hello';
    const [err, data] = await awaitTo(value);
    expect(err).toBeNull();
    expect(data).toBe('hello');
  });

  it('should catch thrown errors inside async function', async () => {
    async function throwError() {
      throw new Error('async error');
    }
    const [err, data] = await awaitTo(throwError());
    expect(err).toBeInstanceOf(Error);
    if (err instanceof Error) {
      expect(err.message).toBe('async error');
    }
    expect(data).toBeUndefined();
  });
});
