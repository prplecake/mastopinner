let pinboardApi = new PinboardApi();

async function injectContentScripts(request, sender) {
	try {
		let tabId = sender.tab.id;
		console.log(tabId);

		await Promise.all([
			// chromeTabsExecuteScript(tabId, { file: "js/mastodon/client.js", runAt: 'document_end'}),
			chromeTabsExecuteScript(tabId, { file: "js/lib/promisified_chrome.js", runAt: 'document_end' }),
			chromeTabsExecuteScript(tabId, { file: "js/lib/pinboard_client.js", runAt: 'document_end' }),
			chromeTabsExecuteScript(tabId, { file: "js/mastodon/mastopinner_ui.js", runAt: 'document_end'})
		]);

		let credentials = await (PinboardCredentials.load());
		pinboardApi.setCredentials(credentials);

		await chromeTabsExecuteScript(tabId, { file: "js/mastodon/mastopinner.js", runAt: 'document_end' });

	} catch (error) {
		console.error(error);
		console.error(`MastoPinner: error while injecting scripts: ${error}`);
	}
}

function getPinboardCredentials(request, sender, sendResponse) {
	let credentials = pinboardApi.credentials;
	if (credentials) {
		sendResponse({ api_token: credentials.api_token, errorMsg: null });
	} else {
		sendResponse({ api_token: null, errorMsg: null });
    }
}

async function setPinboardCredentials(request, sender, sendResponse) {
	try {
		let credentials = new PinboardCredentials(request.api_token);

		await (credentials.save());

		pinboardApi.setCredentials(credentials);

		sendResponse({ success: true, errorMsg: null });
	} catch (error) {
		sendResponse({ success: false, errorMsg: error.message });
	}
}

function sendPinboardApiRequest(request, sender, sendResponse) {
	pinboardApi.sendRequest(request.path, request.method, request.params)
		.then(responseText => sendResponse({ responseText: responseText, errorMsg: null }))
		.catch(error => sendResponse({ responseText: null, errorMsg: error.message }));
}

// Initialize the listener for messages sent by the content scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	let waitForSendResponse = false;

	if (request.type == 'inject_content_scripts') {
		injectContentScripts(request, sender);

	} else if (request.type == 'set_pinboard_credentials') {
		setPinboardCredentials(request, sender, sendResponse);
		waitForSendResponse = true;
	} else if (request.type == 'get_pinboard_credentials') {
		getPinboardCredentials(request, sender, sendResponse);
	} else if (request.type == 'send_pinboard_api_request') {
		sendPinboardApiRequest(request, sender, sendResponse);
		waitForSendResponse = true;
	} else {
		console.warning(`Unhandled message (${JSON.stringify(request)})`);
	}

	return waitForSendResponse;
});
