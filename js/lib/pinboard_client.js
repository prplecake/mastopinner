class PinboardClient {
    constructor() {
        this.api_token = null;
    }

    isAuthenticated() {
        return api_token != null;
    }

    /* Private methods */

    async _clearCredentials() {
        await this._setCredentials({});
    }

    async api(path, method = 'GET', params = {}) {
        let { responseText, errorMsg } = await chromeRuntimeSendMessage({ type: 'send_pinboard_api_request', path, method, params });
        if (errorMsg) {
            throw new Error(errorMsg);
            return;
        }

        return responseText;
    }

    async getPinboardCredentials() {
        let { api_token, errorMsg } = await chromeRuntimeSendMessage({ type: "get_pinboard_credentials" });
        if (errorMsg) {
            throw new Error(errorMsg);
            return;
        }
        return api_token;
    }

    async authenticate() {
        var api_token = prompt("Pinboard API key");
        if (api_token == null) {
            console.warning(`no api token provided for pinboard`);
        }

        this._setCredentials({
            api_token: api_token
        });

        return this.getPinboardCredentials();
    }

    async createBookmark(status) {
        let response = await this.api('posts/add', 'GET', {
            url: status.url,
            actor: status.actor,
            description: status.description
        });
        return response;
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