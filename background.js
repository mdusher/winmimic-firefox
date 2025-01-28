"use strict"

function rewriteUserAgentHeader(e) {
	let ext = browser.storage.local.get(['enabled']);
	let isEnabled = ext.then((result) => {
		if (result.enabled === true) {
			const ua_windows_part = 'Windows NT 10.0; Win64; x64;'
			const ua_regex = /^(Mozilla\/[0-9]*\.[0-9]*) \((.*;) (rv:[0-9]*\.[0-9]*)\) (.*)$/;
			for (var header of e.requestHeaders) {
				if (header.name.toLowerCase() === "user-agent") {
					header.value = header.value.replace(ua_regex, "$1 ("+ua_windows_part+" $3) $4")
				}
			}
		}
		return {requestHeaders: e.requestHeaders};
	});
	return isEnabled
}

function toggleMimic() {
	let ext = browser.storage.local.get(['enabled']);
	ext.then((result) => {
		let newState = false;
		if (typeof result.enabled !== 'undefined') {
			newState = !result.enabled;
		} 
		let win = browser.storage.local.set({"enabled": newState});
		win.then(() => {
			updateToolbar(newState);
			console.log("WinMimic: enabled state changed to: " + newState);
		});
	});
}

function updateToolbar(newState) {
	browser.browserAction.setTitle({
		title: "WinMimic (" + (newState === true ? "enabled" : "disabled") + ")"
	});
	browser.browserAction.setIcon({
    path: newState === true ? {
      48: "icons/win-agent-48.png"
    } : {
      48: "icons/win-agent-grey-48.png"
    }
  });
}

function initialize() {
  let ext = browser.storage.local.get(['enabled']);
	ext.then((result) => {
		let currentState = result.enabled;
		if (typeof currentState === 'undefined') {
			currentState = false;
			toggleMimic();
		}
		updateToolbar(result.enabled);
		console.log('WinMimic: current state is: ' + (result.enabled === true));
	});
}

initialize()
browser.webRequest.onBeforeSendHeaders.addListener(rewriteUserAgentHeader,{urls: ["<all_urls>"]}, ["blocking", "requestHeaders"]);
browser.browserAction.onClicked.addListener(toggleMimic);