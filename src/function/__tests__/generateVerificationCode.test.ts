import { describe, it, expect } from 'vitest';
import { generateVerificationCode } from '../generateVerificationCode';

describe('generateVerificationCode', () => {
  it('should return a string of default length 4 when no parameters are passed', () => {
    const code = generateVerificationCode();
    expect(code).toMatch(/^[a-zA-Z0-9]{4}$/);
  });

  it('should generate a code with specified length', () => {
    const code = generateVerificationCode(8);
    expect(code).toHaveLength(8);
  });

  it('should use a custom charset if provided', () => {
    const charset = 'ABC123';
    const code = generateVerificationCode(6, { charset });
    expect(code.length).toBe(6);
    expect([...code].every(char => charset.includes(char))).toBe(true);
  });

  it('should exclude confusing characters by default', () => {
    const code = generateVerificationCode(100);
    const confusing = /[0Ool1]/;
    expect(confusing.test(code)).toBe(false);
  });

  it('should include confusing characters if excludeConfusing is false', () => {
    const charset = '01loOXYZ';
    const code = generateVerificationCode(100, { charset, excludeConfusing: false });
    const hasConfusing = /[0Ool1]/.test(code);
    expect(hasConfusing).toBe(true);
  });

  it('should throw error if charset is empty after filtering confusing characters', () => {
    expect(() =>
      generateVerificationCode(4, { charset: '0Ool1' })
    ).toThrow(/Character set is empty/);
  });

  it('should return an empty string if length is zero or less', () => {
    expect(generateVerificationCode(0)).toBe('');
    expect(generateVerificationCode(-5)).toBe('');
  });

  it('should generate different codes on subsequent calls (likely)', () => {
    const code1 = generateVerificationCode(6);
    const code2 = generateVerificationCode(6);
    expect(code1).not.toBe(code2);
  });
});
