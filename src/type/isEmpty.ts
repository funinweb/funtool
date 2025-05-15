import {isNaN, isNumber} from './isNumber'
import {isPlainObject} from './isObject'
import {isString} from './isString'
import {isArray} from './isArray'
import {isDate} from './isDate'

/**
 * Checks if a value is empty.
 * 
 * @param v - The value to check.
 * @returns Returns `true` if the value is considered empty, otherwise `false`.
 * 
 * @example
 * // ✅ Returns true
 * isEmpty(null); 
 * isEmpty(undefined); 
 * isEmpty(''); 
 * isEmpty('   '); 
 * isEmpty(NaN); 
 * isEmpty([]); 
 * isEmpty({}); 
 * isEmpty(new Date('invalid date')); 
 * 
 * @example
 * // ❌ Returns false
 * isEmpty('hello'); 
 * isEmpty(123); 
 * isEmpty([1, 2, 3]); 
 * isEmpty({ key: 'value' }); 
 * isEmpty(new Date()); 
 */
export function isEmpty(v: any): boolean {
  // Check if the value is null or undefined
  if (v === null || v === undefined) {
    return true;
  }
  // Check if the value is a string and its trimmed length is 0
  if (isString(v)) {
    return v.trim().length === 0;
  }
  // Check if the value is a number and if it is either 0 or NaN
  if (isNumber(v)) {
    return v === 0 || isNaN(v);
  }
  // Check if the value is an array and its length is 0
  if (isArray(v)) {
    return v.length === 0;
  }
  // Check if the value is a plain object and it has no keys
  if (isPlainObject(v)) {
    return Object.keys(v).length === 0;
  }
  // Check if the value is a Date object and its timestamp is NaN
  if(isDate(v)) {
    return isNaN(v.getTime());
  }
  // If none of the above conditions are met, return false
  return false;
}