import { describe, it, expect } from 'vitest';
import { 
  isElement, 
  isTextNode, 
  isCommentNode, 
  isDocument, 
  isDocumentFragment, 
  isNode, 
  isWindow 
} from '../isElement';

describe('Type checks in isElement.ts', () => {
  // 测试 isElement 函数
  describe('isElement', () => {
    it('should return true for DOM elements', () => {
      if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        const span = document.createElement('span');
        expect(isElement(div)).toBe(true);
        expect(isElement(span)).toBe(true);
      }
    });

    it('should return false for non - DOM elements', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/,
        // 测试 Node 但非 Element 类型
        typeof document !== 'undefined' ? document.createTextNode('text') : null,
        typeof document !== 'undefined' ? document.createComment('comment') : null
      ].filter(Boolean);
      values.forEach(value => {
        expect(isElement(value)).toBe(false);
      });
    });

    it('should return false for custom objects mimicking elements', () => {
      const mockElement = {
        nodeType: 1,
        nodeName: 'DIV',
        // 模拟缺少 Element 原型方法
      };
      expect(isElement(mockElement)).toBe(false);
    });
  });

  // 测试 isTextNode 函数
  describe('isTextNode', () => {
    it('should return true for Text nodes', () => {
      if (typeof document !== 'undefined') {
        const textNode = document.createTextNode('Hello');
        const emptyTextNode = document.createTextNode('');
        expect(isTextNode(textNode)).toBe(true);
        expect(isTextNode(emptyTextNode)).toBe(true);
      }
    });

    it('should return false for non - Text nodes', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/,
        typeof document !== 'undefined' ? document.createElement('div') : null,
        typeof document !== 'undefined' ? document.createComment('comment') : null
      ].filter(Boolean);
      values.forEach(value => {
        expect(isTextNode(value)).toBe(false);
      });
    });
  });

  // 测试 isCommentNode 函数
  describe('isCommentNode', () => {
    it('should return true for Comment nodes', () => {
      if (typeof document !== 'undefined') {
        const commentNode = document.createComment('test');
        const emptyCommentNode = document.createComment('');
        expect(isCommentNode(commentNode)).toBe(true);
        expect(isCommentNode(emptyCommentNode)).toBe(true);
      }
    });

    it('should return false for non - Comment nodes', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/,
        typeof document !== 'undefined' ? document.createElement('div') : null,
        typeof document !== 'undefined' ? document.createTextNode('text') : null
      ].filter(Boolean);
      values.forEach(value => {
        expect(isCommentNode(value)).toBe(false);
      });
    });
  });

  // 测试 isDocument 函数
  describe('isDocument', () => {
    it('should return true for Document nodes', () => {
      if (typeof document !== 'undefined') {
        expect(isDocument(document)).toBe(true);
      }
    });

    it('should return false for non - Document nodes', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/,
        typeof document !== 'undefined' ? document.createElement('div') : null,
        typeof document !== 'undefined' ? document.createTextNode('text') : null
      ].filter(Boolean);
      values.forEach(value => {
        expect(isDocument(value)).toBe(false);
      });
    });
  });

  // 测试 isDocumentFragment 函数
  describe('isDocumentFragment', () => {
    it('should return true for DocumentFragment nodes', () => {
      if (typeof document !== 'undefined') {
        const fragment = document.createDocumentFragment();
        expect(isDocumentFragment(fragment)).toBe(true);
      }
    });

    it('should return false for non - DocumentFragment nodes', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/,
        typeof document !== 'undefined' ? document.createElement('div') : null,
        typeof document !== 'undefined' ? document.createTextNode('text') : null
      ].filter(Boolean);
      values.forEach(value => {
        expect(isDocumentFragment(value)).toBe(false);
      });
    });
  });

  // 测试 isNode 函数
  describe('isNode', () => {
    it('should return true for DOM nodes', () => {
      if (typeof document !== 'undefined') {
        const div = document.createElement('div');
        const textNode = document.createTextNode('Hi');
        const commentNode = document.createComment('test');
        const fragment = document.createDocumentFragment();
        expect(isNode(div)).toBe(true);
        expect(isNode(textNode)).toBe(true);
        expect(isNode(commentNode)).toBe(true);
        expect(isNode(fragment)).toBe(true);
      }
    });

    it('should return false for non - DOM nodes', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/
      ];
      values.forEach(value => {
        expect(isNode(value)).toBe(false);
      });
    });
  });

  // 测试 isWindow 函数
  describe('isWindow', () => {
    it('should return true for window object', () => {
      if (typeof window !== 'undefined') {
        expect(isWindow(window)).toBe(true);
      }
    });

    it('should return false for non - window objects', () => {
      const values = [
        null,
        undefined,
        123,
        'string',
        true,
        Symbol('test'),
        {},
        [],
        () => {},
        new Date(),
        /regex/,
        typeof document !== 'undefined' ? document.createElement('div') : null,
        typeof document !== 'undefined' ? document.createTextNode('text') : null
      ].filter(Boolean);
      values.forEach(value => {
        expect(isWindow(value)).toBe(false);
      });
    });

    it('should return false for window - like objects', () => {
      const mockWindow = {
        // 模拟 window 对象部分属性
        location: {},
        document: {}
      };
      expect(isWindow(mockWindow)).toBe(false);
    });
  });
});