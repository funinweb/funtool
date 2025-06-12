import { describe, it, expect, vi } from 'vitest';
import { throttle, throttleSync } from '../throttle';

describe('throttle', () => {
  it('should throttle async function', async () => {
    const mockFn = vi.fn().mockResolvedValue('result');
    const throttled = throttle(mockFn, 100);
    
    const p1 = throttled();
    const p2 = throttled();
    
    await p1;
    expect(mockFn).toHaveBeenCalledTimes(1);
    await p2;
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  it('flush should execute pending call', async () => {
    const mockFn = vi.fn();
    const throttled = throttle(mockFn, 100);
    
    throttled();
    throttled();
    await throttled.flush();
    
    expect(mockFn).toHaveBeenCalledTimes(2);
  });
});

describe('throttleSync', () => {
  it('should throttle sync function', () => {
    vi.useFakeTimers();
    const mockFn = vi.fn();
    const throttled = throttleSync(mockFn, 100);
    
    throttled();
    throttled();
    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
    
    vi.advanceTimersByTime(60);
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(2);
    
    vi.useRealTimers();
  });
});