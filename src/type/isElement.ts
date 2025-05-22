
/**
 * Checks whether the given value is a DOM Element.
 *
 * This function uses the `instanceof Element` check, which is the most reliable
 * and type-safe way to determine if a value is an Element in the browser environment.
 *
 * @template T - The input value type.
 * @param value - The value to check.
 * @returns {value is T & Element} - Returns true if the value is a DOM Element,
 * and narrows the type to `T & Element`.
 *
 * @example
 * const el = document.createElement('div');
 * if (isElement(el)) {
 *   // `el` is now inferred as `Element`, with all its methods and properties.
 *   el.classList.add('active');
 * }
 *
 * const notEl = {};
 * if (!isElement(notEl)) {
 *   console.log('Not a DOM element');
 * }
 */
export function isElement<T = unknown>(value: T): value is T & Element {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as unknown as Element).nodeType === 'number' &&
    (value as unknown as Element).nodeType === 1 &&
    typeof (value as unknown as Element).nodeName === 'string' &&
    (typeof Element !== 'undefined' && value instanceof Element)
  );
}

/**
 * Checks if the value is a Text node.
 * 
 * @template T
 * @param value - The value to check.
 * @returns {value is T & Text}
 * 
 * @example
 * isTextNode(document.createTextNode('Hello')); // true
 */
export function isTextNode<T = unknown>(value: T): value is T & Text {
  return typeof Node !== 'undefined' &&
         value instanceof Node &&
         value.nodeType === Node.TEXT_NODE;
}

/**
 * Checks if the value is a Comment node.
 * 
 * @template T
 * @param value - The value to check.
 * @returns {value is T & Comment}
 * 
 * @example
 * isCommentNode(document.createComment('test')); // true
 */
export function isCommentNode<T = unknown>(value: T): value is T & Comment {
  return typeof Node !== 'undefined' &&
         value instanceof Node &&
         value.nodeType === Node.COMMENT_NODE;
}

/**
 * Checks if the value is a Document node.
 * 
 * @template T
 * @param value - The value to check.
 * @returns {value is T & Document}
 * 
 * @example
 * isDocument(document); // true
 */
export function isDocument<T = unknown>(value: T): value is T & Document {
  return typeof Document !== 'undefined' && value instanceof Document;
}

/**
 * Checks if the value is a DocumentFragment.
 * 
 * @template T
 * @param value - The value to check.
 * @returns {value is T & DocumentFragment}
 * 
 * @example
 * isDocumentFragment(document.createDocumentFragment()); // true
 */
export function isDocumentFragment<T = unknown>(value: T): value is T & DocumentFragment {
  return typeof Node !== 'undefined' &&
         value instanceof Node &&
         value.nodeType === Node.DOCUMENT_FRAGMENT_NODE;
}

/**
 * Checks if the value is a general DOM Node.
 * 
 * @template T
 * @param value - The value to check.
 * @returns {value is T & Node}
 * 
 * @example
 * isNode(document.createTextNode('Hi')); // true
 * isNode(document.createElement('div')); // true
 */
export function isNode<T = unknown>(value: T): value is T & Node {
  return typeof Node !== 'undefined' && value instanceof Node;
}

/**
 * Checks if the value is a global window object.
 * 
 * @template T
 * @param value - The value to check.
 * @returns {value is T & Window}
 * 
 * @example
 * isWindow(window); // true
 */
export function isWindow<T = unknown>(value: T): value is T & Window {
  return typeof window !== 'undefined' && value === window;
}