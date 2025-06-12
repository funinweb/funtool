/**
 * Base64. Convert base64 string to Blob object.  
 * 将 base64 字符串转换为 Blob 对象（内部私有方法）
 *
 * @param {string} base64 - Base64 string, e.g., 'data:image/png;base64,...'  
 *                          base64 字符串，必须包含 MIME 前缀
 * @returns {{ blob: Blob; mime: string; ext: string }} Blob object, MIME type, and file extension  
 *          返回 Blob 对象、MIME 类型、文件扩展名
 *
 * @example
 * const { blob, mime, ext } = base64ToBlob(base64)
 */
export function base64ToBlob(base64: string): { blob: Blob; mime: string; ext: string } {
  const [meta, data] = base64.split(',');
  if (!meta || !data) {
    throw new Error('Invalid base64 format'); // 格式不合法
  }

  const mimeMatch = meta.match(/:(.*?);/);
  const mime = mimeMatch?.[1] || 'application/octet-stream';
  const ext = mime.split('/')[1] || 'bin';

  const binary = atob(data);
  const uint8Array = Uint8Array.from(binary, c => c.charCodeAt(0));
  const blob = new Blob([uint8Array], { type: mime });

  return { blob, mime, ext };
}