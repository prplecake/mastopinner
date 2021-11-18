const STATUS_SELECTOR = '.item-list .status';

class MastoPinner {
    constructor() {
        this.mastoPinnerUIs = [];
    }

    initialize() {
        console.debug('MastoPinner: initializing...');
        // check once again we have a mastodon web app
        let mastodonApp = document.querySelector('.app-holder#mastodon');
        if (!mastodonApp) {
            console.warn(`MastoPinner: mastodon web app initially detected but cannot be found now`);
            return;
        }

        // inject the initially visible statuses
        let statuses = document.querySelectorAll(STATUS_SELECTOR);
        if (statuses.length > 0) {
            this._inject();
        }

        // set up mutation observer to detect when dropdown-menu appears
        let uiContainer = mastodonApp.querySelector('div.ui');
        let observer = new MutationObserver((/* mutations */) => {
            this._inject();
        });
        observer.observe(uiContainer, { childList: true, subtree: true });
    }

    async _inject() {
        let statuses = document.querySelectorAll(STATUS_SELECTOR);
        if (statuses.length == 0) {
            console.warning(`MastoPinner: couldn't inject the UI: no statuses found.`);
            return;
        }

        this.mastoPinnerUIs = Array.from(statuses).map(status => {
            console.log(status.classList);
            return new MastoPinnerUI(status, {
                send: this.pinStatusAction.bind(this)
            });
        });
    }

    // Actions

    pinStatusAction(status) {
        let hasCredentials = !!this.store.state;
    }
}

// inject the UI into the Mastodon web app
let mastoPinner = new MastoPinner();
mastoPinner.initialize();
