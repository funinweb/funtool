import { describe, it, expect } from "vitest"
import { isEqual } from "../isEqual"

describe("isEqual Function", () => {

	it("should compare primitive values correctly", () => {
		expect(isEqual(5, 5)).toBe(true) // ✅ true
		expect(isEqual(5, "5")).toBe(false) // ❌ false
	})

	it("should compare arrays in order correctly", () => {
		expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true) // ✅ true
		expect(isEqual([1, 2, 3], [3, 2, 1])).toBe(false) // ❌ false
	})

	it("should compare arrays unordered correctly", () => {
		//isEqual([1, 2, 3], [3, 2, 1], true)
		expect(isEqual([1, 2, 3], [3, 2, 1], { ordered: false })).toBe(true) // ✅ true
	})

	it("should compare objects", () => {
		expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true) // ✅ true
		expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false) // ❌ false
		//deep
		expect(isEqual({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true) // ✅ true
		expect(isEqual({ a: { b: 2 } }, { a: { b: 3 } })).toBe(false) // ❌ false
	})

	it("should compare Date objects correctly", () => {
		expect(isEqual(new Date("2025-05-01"), new Date("2025-05-01"))).toBe(true) // ✅ true
		expect(isEqual(new Date("2025-05-01"), new Date("2025-05-02"))).toBe(false) // ❌ false
	})

	it("should compare Maps correctly", () => {
		const map1 = new Map([
			["key1", "value1"],
			["key2", "value2"],
		])
		const map2 = new Map([
			["key1", "value1"],
			["key2", "value2"],
		])
		expect(isEqual(map1, map2)).toBe(true) // ✅ true
	})

	it("should compare Sets correctly", () => {
		const set1 = new Set([1, 2, 3])
		const set2 = new Set([3, 2, 1])
		expect(isEqual(set1, set2)).toBe(false) // ✅ true
	})
	it("should compare Symbols correctly", () => {
		const sym1 = Symbol("sym")
		const sym2 = Symbol("sym")
		//sym1.description === sym2.description
		expect(isEqual(sym1, sym2)).toBe(true) // ✅ true
	})

	it("should compare BigInt correctly", () => {
		expect(isEqual(BigInt(123), BigInt(123))).toBe(true) // ✅ true
		expect(isEqual(BigInt(123), BigInt(124))).toBe(false) // ❌ false
	})

	it('should compare ArrayBuffers correctly', () => {
    const buf1 = new ArrayBuffer(4);
    const buf2 = new ArrayBuffer(4);
    const view1 = new Uint8Array(buf1);
    const view2 = new Uint8Array(buf2);
    view1[0] = 12;
    view2[0] = 12;
    expect(isEqual(buf1, buf2)).toBe(true);  // ✅ true

    view2[0] = 14;
    expect(isEqual(buf1, buf2)).toBe(false);  // ❌ false
  })

  it('should compare TypedArrays correctly', () => {
    const a = new Uint8Array([1, 2, 3]);
    const b = new Uint8Array([1, 2, 3]);
    expect(isEqual(a, b)).toBe(true);  // ✅ true

    const c = new Uint8Array([1, 2, 4]);
    expect(isEqual(a, c)).toBe(false);  // ❌ false
  })

  it('should compare DataViews correctly', () => {
    const buffer1 = new ArrayBuffer(4);
    const buffer2 = new ArrayBuffer(4);
    const dv1 = new DataView(buffer1);
    const dv2 = new DataView(buffer2);
    dv1.setInt8(0, 100);
    dv2.setInt8(0, 100);
    expect(isEqual(dv1, dv2)).toBe(true);  // ✅ true

    dv2.setInt8(0, 101);
    expect(isEqual(dv1, dv2)).toBe(false);  // ❌ false
  })
})
