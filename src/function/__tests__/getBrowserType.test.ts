import { describe, it, expect, vi } from "vitest";
import { getBrowserType } from "../getBrowserType";
import * as uaParserModule from "../parseUA";
import type { ParsedUA } from "../parseUA"; // 确认 ParsedUA 类型路径正确

// 符合 ParsedUA 类型的模拟函数
const mockParseUA = (
  name: string | null,
  version: string | null,
  majorVersion?: string | null,
): ParsedUA => ({
  browser: {
    name,
    version,
    majorVersion,
  },
  os: {
    name: null,
    version: null,
    majorVersion: null,
  },
  device: {
    type: "Desktop",  // 必须是联合类型中允许的字面量
    model: null,
    vendor: null,
  },
  engine: {
    name: null,
    version: null,
  },
  originalUA: "",
});

describe("getBrowserType", () => {
  it("should return correct IE version (IE7 to IE10)", () => {
    for (let v = 7; v <= 10; v++) {
      vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
        mockParseUA("Internet Explorer", v.toString(), v.toString())
      );
      expect(getBrowserType()).toBe(`IE${v}`);
    }
  });

  it("should return IE11 for IE11 user agent", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA("Internet Explorer", "11.0", "11")
    );
    expect(getBrowserType()).toBe("IE11");
  });

  it("should return Edge for Edge browsers", () => {
    ["Edge (Chromium)", "Edge (Legacy)"].forEach((edgeName) => {
      vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
        mockParseUA(edgeName, "90.0", "90")
      );
      expect(getBrowserType()).toBe("Edge");
    });
  });

  it("should return Firefox", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA("Firefox", "100.0", "100")
    );
    expect(getBrowserType()).toBe("FireFox");
  });

  it("should return Opera", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA("Opera", "80.0", "80")
    );
    expect(getBrowserType()).toBe("Opera");
  });

  it("should return Chrome", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA("Chrome", "110.0", "110")
    );
    expect(getBrowserType()).toBe("Chrome");
  });

  it("should return Safari", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA("Safari", "14.0", "14")
    );
    expect(getBrowserType()).toBe("Safari");
  });

  it("should return null if browser info missing", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA(null, null)
    );
    expect(getBrowserType()).toBe(null);
  });

  it("should return null for unrecognized browsers", () => {
    vi.spyOn(uaParserModule, "parseUA").mockReturnValueOnce(
      mockParseUA("UnknownBrowser", "1.0", "1")
    );
    expect(getBrowserType()).toBe(null);
  });
});
