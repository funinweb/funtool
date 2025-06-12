import { base64ToBlob } from "./base64ToBlob";

/**
 * Base64. Convert base64 string to FormData with file field.  
 * 将 base64 字符串转换为包含文件字段的 FormData 对象
 *
 * @param {string} base64 - Base64 string with data URL format  
 *                          含有 data URL 前缀的 base64 字符串
 * @param {Object} [options] - Optional configuration 配置项
 * @param {string} [options.key="file"] - FormData field name (default: 'file')  
 *                                        FormData 中的字段名（默认 "file"）
 * @param {string} [options.filename] - File name (with or without extension)  
 *                                      文件名（可不带扩展名，将自动补全）
 * @returns {FormData} FormData instance with one file field  
 *                     包含一个文件字段的 FormData 对象
 *
 * @example
 * const formData = base64ToFormData(base64, {
 *   key: 'avatar',
 *   filename: 'my-photo' // 自动补 .jpg 等扩展名
 * });
 * formData.append('userId', '123');
 */
export function base64ToFormData(
  base64: string,
  options?: {
    key?: string;
    filename?: string;
  }
): FormData {
  const { blob, ext } = base64ToBlob(base64);

  const key = options?.key || 'file';

  let filename = options?.filename;
  if (filename) {
    if (!filename.includes('.')) {
      filename += `.${ext}`;
    }
  } else {
    filename = `${Date.now()}.${ext}`;
  }

  const formData = new FormData();
  formData.append(key, blob, filename);

  return formData;
}