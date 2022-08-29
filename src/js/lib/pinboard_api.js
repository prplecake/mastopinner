const PINBOARD_API_URL = "https://api.pinboard.in/v1/";
const PINBOARD_DESC_MAX_LENGTH = 255;

class PinboardApi {
    constructor() {
        this.credentials = null;
    }

    setCredentials(pinboardCredentials) {
        this.credentials = pinboardCredentials;
    }

    async sendRequest(path, method = 'GET', params = {}) {
        let url = PINBOARD_API_URL + path;
        let descriptionTrimmed = false;
        let trimmedDescription;

        let extended = params.extended || "",
            tags = "via:" + params.actor || "";
        tags += " via:MastoPinner";
        
        if (params.description.length > PINBOARD_DESC_MAX_LENGTH) {
            trimmedDescription = params.description.slice(0, PINBOARD_DESC_MAX_LENGTH) + '...';
            descriptionTrimmed = true;
        }
        if (descriptionTrimmed) {
            extended = `<blockquote>${params.description}</blockquote>`;
            params.description = trimmedDescription;
        }

        let queryString = `?auth_token=${this.credentials.api_token}&shared=no&extended=${extended}&tags=${tags}&format=json&description=${params.description}&url=${params.url}`;
        console.log(queryString);

        let xhr = new XMLHttpRequest();
        xhr.open(method, url + queryString);
        xhr.send();
        xhr.onload = function () {
            if (xhr.status !== 200) {
                throw new Error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            return JSON.parse(xhr.responseText);
        };
    }
}