let mastodonApp = document.querySelector('.app-holder#mastodon');
if (mastodonApp) {
	chrome.runtime.sendMessage({ type: 'inject_content_scripts' });
}