const STATUS_SELECTOR = '.item-list .status';

class MastoPinner {
    constructor() {
        this.pinboardClient = new PinboardClient();
        this.store = new MastoPinnerStore();
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
            console.warn(`MastoPinner: couldn't inject the UI: no statuses found.`);
            return;
        }

        this.mastoPinnerUIs = Array.from(statuses).map(status => {
            //console.log("classList: " + status.classList);
            if(!status.classList.contains('status-direct')){
                return new MastoPinnerUI(status, {
                    send: this.pinStatusAction.bind(this)
                });
            }
        });

        let api_token = await this.pinboardClient.getPinboardCredentials();
        if (api_token) {
            this.store.transitionToSignedIn(api_token);
        }
    }

    // Actions

    async pinStatusAction(status) {
        console.debug(`sending status to Pinboard...`);
        console.debug(status);
        try {
            let hasCredentials = !!this.store.state.api_token;
            console.log(`hasCredentials: ${hasCredentials}`);
            console.log(`this.state: ${this.store.state.api_token}`);
            if (!hasCredentials) {
                let api_token = await this.pinboardClient.authenticate();

                this.store.transitionToSignedIn(api_token);
            }

            await this.pinboardClient.createBookmark(status);
        } catch (error) {
            console.error(`error saving bookmark: ${error}`);
        }

    }
}

class MastoPinnerStore {
    constructor() {
        this.state = {
            api_token: null,
            error_message: null
        };
    }

    transitionToSignedIn(api_token) {
        this.state.api_token = api_token;
        this.state.error_message = null;
    }
}

// inject the UI into the Mastodon web app
let mastoPinner = new MastoPinner();
mastoPinner.initialize();
