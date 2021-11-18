async function injectContentScripts(request, sender){
	try {
		let tabId = sender.tab.id;
		console.log(tabId);

		await Promise.all([
			// chromeTabsExecuteScript(tabId, { file: "js/mastodon/client.js", runAt: 'document_end'}),
			chromeTabsExecuteScript(tabId, { file: "js/mastodon/mastopinner_ui.js", runAt: 'document_end'}),
			chromeTabsExecuteScript(tabId, { file: "js/mastodon/mastopinner.js", runAt: 'document_end'})
		]);
	} catch (error) {
		console.error(error);
		console.error(`Mastopinner: error while injecting scripts: ${error}`);
	}
}

async function setPinboardCredentials(request, sender, sendResponse) {
	try {
		let credentials = new PinboardCredentials(request.api_token);
		await (credentials.save());

		sendResponse({ success: true, errorMsg: null });
	} catch (error) {
		sendResponse({ success: false, errorMsg: error.message });
	}
}

// Initialize the listener for messages sent by the content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	let waitForSendResponse = false;

	if (request.type == 'inject_content_scripts') {
		injectContentScripts(request, sender);

	} else if (request.type == 'set_pinboard_credentials') {
		setPinboardCredentials(request, sender, sendResponse);
		waitForSendResponse = true;
	} else {
		console.warning(`Unhandled message (${JSON.stringify(requesT)})`);
	}

	return waitForSendResponse;
});
