export interface ParsedURL {
  host: string;
  hostname: string;
  pathname: string;
  port: string;
  protocol: string;
  origin: string;
  href: string;
  search: string;
  hash: string;
  query: Record<string, any>;
}

/**
 * Parses a URL string into a structured object.
 * 解析 URL 字符串为结构化对象。
 *
 * @param {string} url - The full URL string to parse. 要解析的完整 URL 字符串。
 * @returns {ParsedURL} Parsed URL components. 解析后的 URL 组件对象。
 *
 * @example
 * urlParse("https://example.com:8080/path?a=1&b=true&b=false&c=");
 * // =>
 * {
 *   host: "example.com:8080",
 *   hostname: "example.com",
 *   pathname: "/path",
 *   port: "8080",
 *   protocol: "https:",
 *   origin: "https://example.com:8080",
 *   href: "https://example.com:8080/path?a=1&b=true&b=false&c=",
 *   search: "?a=1&b=true&b=false&c=",
 *   hash: "",
 *   query: {
 *     a: 1,
 *     b: ["true", "false"],
 *     c: ""
 *   }
 * }
 */
export function urlParse(url: string):ParsedURL {
	const [urlWithoutHash, hashPart] = url.split("#")
	const [baseUrl, searchPart] = urlWithoutHash.split("?")

	let protocol = ""
	let host = ""
	let pathname = "/"

	const protocolMatch = baseUrl.match(/^([a-zA-Z]+:)?\/\//)
	if (protocolMatch) {
		protocol = protocolMatch[1] || ""
		const rest = baseUrl.slice(protocol.length + 2)
		const slashIndex = rest.indexOf("/")
		if (slashIndex >= 0) {
			host = rest.slice(0, slashIndex)
			pathname = rest.slice(slashIndex) || "/"
		} else {
			host = rest
			pathname = "/"
		}
	} else {
		pathname = baseUrl || "/"
	}

	let hostname = host
	let port = ""
	const portIndex = host.indexOf(":")
	if (portIndex >= 0) {
		hostname = host.slice(0, portIndex)
		port = host.slice(portIndex + 1)
	}

	const origin = protocol + "//" + host

	const query: Record<string, any> = {}

	if (searchPart) {
		const pairs = searchPart.split("&")
		for (const pair of pairs) {
			if (!pair) continue

			const [rawKey, rawValue] = pair.split("=")
			const key = decodeURIComponent(rawKey || "").trim()
			if (!key) continue

			const valueRaw = rawValue !== undefined ? decodeURIComponent(rawValue).trim() : ""

			let value: any
			if (/^\d+(\.\d+)?$/.test(valueRaw)) {
				value = Number(valueRaw)
			} else if (valueRaw === "true") {
				value = true
			} else if (valueRaw === "false") {
				value = false
			} else {
				value = valueRaw
			}

			if (query.hasOwnProperty(key)) {
				if (Array.isArray(query[key])) {
					query[key].push(value)
				} else {
					query[key] = [query[key], value]
				}
			} else {
				query[key] = value
			}
		}
	}

	return {
		host,
		hostname,
		pathname,
		port,
		protocol,
		origin,
		href: url,
		search: searchPart ? `?${searchPart}` : "",
		hash: hashPart ? `#${decodeURIComponent(hashPart)}` : "",
		query,
	}
}
