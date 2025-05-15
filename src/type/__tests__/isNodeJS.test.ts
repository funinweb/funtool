import { describe, it, expect } from 'vitest';
import { isNodeJS } from '../isNodeJS';

describe('isNodeJS', () => {
  it('should return true in a Node.js environment', () => {
    expect(isNodeJS()).toBe(true);
  });

  it('should return false if process is undefined (simulating a browser environment)', () => {
    const originalProcess = globalThis.process;

    // Simulate no process object (like in browsers)
    // @ts-ignore
    delete globalThis.process;

    expect(isNodeJS()).toBe(false);

    // Restore the original process object
    globalThis.process = originalProcess;
  });

  it('should return false if process.versions.node is missing', () => {
    const originalProcess = globalThis.process;

    // Simulate process object without versions.node
    // @ts-ignore
    globalThis.process = { versions: {} };

    expect(isNodeJS()).toBe(false);

    // Restore the original process object
    globalThis.process = originalProcess;
  });
});