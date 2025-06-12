
export function getUA(overrideUA?: string) {
  if (overrideUA !== undefined) return overrideUA;
  if (typeof navigator !== "undefined" && typeof navigator.userAgent === "string") {
    return navigator.userAgent;
  }
  return "";
}