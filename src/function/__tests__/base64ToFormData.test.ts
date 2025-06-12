import { describe, it, expect, vi } from 'vitest';
import { base64ToFormData } from '../base64ToFormData';

vi.mock('../base64ToBlob', () => ({
  base64ToBlob: vi.fn(() => ({
    blob: new Blob(['test'], { type: 'image/png' }),
    ext: 'png'
  }))
}));

describe('base64ToFormData', () => {
  const testBase64 = 'data:image/png;base64,test';

  it('should create FormData with default options', () => {
    const formData = base64ToFormData(testBase64);
    const file = formData.get('file') as File;
    
    expect(file).toBeInstanceOf(Blob);
    expect(file.name).toMatch(/^\d+\.png$/);
  });

  it('should use custom field name when provided', () => {
    const formData = base64ToFormData(testBase64, { key: 'avatar' });
    const file = formData.get('avatar') as File;
    expect(file).toBeInstanceOf(Blob);
  });

  it('should use custom filename when provided', () => {
    const formData = base64ToFormData(testBase64, { filename: 'custom' });
    const file = formData.get('file') as File;
    expect(file.name).toBe('custom.png');
  });

  it('should not add extension if filename already has one', () => {
    const formData = base64ToFormData(testBase64, { filename: 'custom.jpg' });
    const file = formData.get('file') as File;
    expect(file.name).toBe('custom.jpg');
  });
});