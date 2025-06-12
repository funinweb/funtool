import { describe, it, expect } from 'vitest';
import { parseUA } from '../parseUA';

describe('parseUA', () => {
  it('should parse Chrome user agent', () => {
    const ua = 'Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    const result = parseUA(ua);
    expect(result.browser.name).toBe('Chrome');
    expect(result.browser.version).toBe('120.0.0.0');
    expect(result.os.name).toBe('Windows');
  });

  it('should detect mobile devices', () => {
    const ua = 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1';
    const result = parseUA(ua);
    expect(result.device.type).toBe('Mobile');
    expect(result.device.model).toBe('iPhone');
  });

  it('should return Desktop as default device type', () => {
    const result = parseUA('Custom UA String');
    expect(result.device.type).toBe('Desktop');
  });
});