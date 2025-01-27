"use strict"

function rewriteUserAgentHeader(e) {
	const ua_windows_part = 'Windows NT 10.0; Win64; x64;'
	const ua_regex = /^(Mozilla\/[0-9]*\.[0-9]*) \((.*;) (rv:[0-9]*\.[0-9]*)\) (.*)$/;
	for (var header of e.requestHeaders) {
		if (header.name.toLowerCase() === "user-agent") {
			header.value = header.value.replace(ua_regex, "$1 ("+ua_windows_part+" $3) $4")
		}
	}
	return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,{urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
