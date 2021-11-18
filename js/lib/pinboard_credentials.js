class PinboardCredentials {
    constructor(credentials) {
        credentials = credentials || {};

        this.api_token = credentials.api_token || null;
    }

    get hasToken() {
        return this.api_token;
    }

    static async load() {
        let results = await chromeStorageLocalGet(['api_token']);
        let hasToken = results.api_token;
        if (hasToken) {
            return new PinboardCredentials(results);
        } else {
            return null;
        }
    }

    async save() {
        await chromeStorageLocalSet({
            api_token: this.api_token
        });
    }
}