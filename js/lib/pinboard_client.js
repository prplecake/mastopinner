class PinboardClient {
    constructor(api_token) {
        this.api_token = api_token;
    }

    isAuthenticated() {
        return api_token != null;
    }

    /* Private methods */

    async _clearCredentials() {
        await this._setCredentials({});
    }

    async _setCredentials(api_token) {
        let { success, errorMsg } = await chromeRuntimeSendMessage({ type: 'set_pinboard_credentials', api_token});
        if (errorMsg) {
            throw new Error(errorMsg);
            return;
        }

        return success;
    }
}