import { describe, it, expect } from 'vitest';
import { isDataView } from '../isDataView';

 describe('isDataView', () => {
  it('should return true for DataView', () => {
    const arrayBuffer = new ArrayBuffer(8);
    const dataView = new DataView(arrayBuffer);
    expect(isDataView(dataView)).toBe(true);
  });

  it('should return false for non-DataView', () => {
    expect(isDataView('not a DataView')).toBe(false);
    expect(isDataView([])).toBe(false);
    expect(isDataView({})).toBe(false);
  });
});