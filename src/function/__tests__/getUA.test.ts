import { describe, it, expect, vi } from 'vitest';
import { getUA } from '../getUA';

describe('getUA', () => {
  it('should return override UA when provided', () => {
    expect(getUA('custom UA')).toBe('custom UA');
  });

  it('should return navigator.userAgent when available', () => {
    const mockUserAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)';
    vi.stubGlobal('navigator', { userAgent: mockUserAgent });
    
    expect(getUA()).toBe(mockUserAgent);
    vi.unstubAllGlobals();
  });

  it('should return empty string when navigator is not available', () => {
    vi.stubGlobal('navigator', undefined);
    expect(getUA()).toBe('');
    vi.unstubAllGlobals();
  });
});