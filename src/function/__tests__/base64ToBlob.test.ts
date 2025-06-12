import { describe, it, expect } from 'vitest';
import { base64ToBlob } from '../base64ToBlob';

describe('base64ToBlob', () => {
  const testBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';

  it('should convert base64 to Blob with correct properties', () => {
    const { blob, mime, ext } = base64ToBlob(testBase64);
    
    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('image/png');
    expect(mime).toBe('image/png');
    expect(ext).toBe('png');
  });

  it('should throw error for invalid base64 format', () => {
    expect(() => base64ToBlob('invalid')).toThrow('Invalid base64 format');
  });

  it('should handle different mime types', () => {
    const jpegBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAAAAAADASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAf/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAABgj/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD/2Q==';
    const { mime, ext } = base64ToBlob(jpegBase64);
    
    expect(mime).toBe('image/jpeg');
    expect(ext).toBe('jpeg');
  });
});