import { describe, it, expect } from 'vitest';
import { words } from '../words';

describe('words', () => {
  it('should split camelCase', () => {
    expect(words('helloWorld')).toEqual(['hello', 'World']); // ✅
  });

  it('should split PascalCase', () => {
    expect(words('HelloWorld')).toEqual(['Hello', 'World']); // ✅
  });

  it('should split snake_case', () => {
    expect(words('hello_world')).toEqual(['hello', 'world']); // ✅
  });

  it('should split kebab-case', () => {
    expect(words('hello-world')).toEqual(['hello', 'world']); // ✅
  });

  it('should handle mixed delimiters', () => {
    expect(words('hello_world-test Value')).toEqual(['hello', 'world', 'test', 'Value']); // ✅
  });

  it('should split acronym followed by capitalized word', () => {
    expect(words('APIversion')).toEqual(['AP', 'Iversion']); // ✅
    expect(words('APIVersion')).toEqual(['API', 'Version']); // ✅
    expect(words('APIResponse')).toEqual(['API', 'Response']); // ✅
    expect(words('HTMLBody')).toEqual(['HTML', 'Body']); // ✅
  });

  it('should handle acronyms with underscores', () => {
    expect(words('API_response')).toEqual(['API', 'response']); // ✅
  });

  it('should split digits within text', () => {
    expect(words('userID2Token')).toEqual(['user', 'ID', '2', 'Token']); // ✅
  });

  it('should handle uppercase single word', () => {
    expect(words('ID')).toEqual(['ID']); // ✅
  });

  it('should handle lowercase single word', () => {
    expect(words('token')).toEqual(['token']); // ✅
  });

  it('should trim and normalize extra spaces or dashes', () => {
    expect(words('  hello--World__name ')).toEqual(['hello', 'World', 'name']); // ✅
  });

  it('should split MyXMLParser', () => {
    expect(words('MyXMLParser')).toEqual(['My', 'XML', 'Parser']); // ✅
  });
});
