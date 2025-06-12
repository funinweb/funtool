import { describe, it, expect } from "vitest";
import { ObjectId } from "../ObjectId";

describe("ObjectId", () => {
  it("should generate valid hex", () => {
    const id = new ObjectId();
    expect(ObjectId.isValid(id.toHexString())).toBe(true);
  });

  it("should accept valid hex in constructor", () => {
    const hex = "5f1d7f3b1c9d440000000000";
    const id = new ObjectId(hex);
    expect(id.toHex()).toBe(hex);
  });

  it("should throw on invalid hex", () => {
    expect(() => new ObjectId("invalid-hex")).toThrow();
  });

  it("should convert to buffer", () => {
    const id = new ObjectId();
    expect(id.toBuffer()).toBeInstanceOf(Uint8Array);
    expect(id.toBuffer()).toHaveLength(12);
  });

  it("should support equality comparison", () => {
    const id1 = new ObjectId();
    const id2 = ObjectId.createFromHexString(id1.toHexString());
    expect(id1.equals(id2)).toBe(true);
  });

  it("should parse from mixed string", () => {
    const id = new ObjectId();
    const str = `uuid-${id.toHexString()}`;
    console.log(str)
    const parsed = ObjectId.parse(str);
    expect(parsed.equals(id)).toBe(true);
  });

  it("should return UUID format", () => {
    const id = new ObjectId("5f1d7f3b1c9d440000000000");
    expect(id.toUUIDString()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
  });

  it("should convert to base64", () => {
    const id = new ObjectId();
    const base64 = id.toBase64();
    expect(typeof base64).toBe("string");
  });

  it("should generate short id with prefix", () => {
    const id = new ObjectId();
    expect(id.short("u_")).toMatch(/^u_[A-Za-z0-9+/]+$/);
  });

  it("should support cloning", () => {
    const id1 = new ObjectId();
    const id2 = id1.clone();
    expect(id1.equals(id2)).toBe(true);
    expect(id1).not.toBe(id2);
  });

  it("should extract timestamp", () => {
    const now = Date.now();
    const id = new ObjectId();
    const ts = id.getTimestamp();
    expect(ts).toBeLessThanOrEqual(now);
  });
});
