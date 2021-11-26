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
        let baseUrl = PINBOARD_API_URL;
        let url = baseUrl + path;
        let descriptionTrimmed = false;

        var extended = params.extended || "",
            tags = params.actor || "",
            tags = tags + " via:MastoPinner";
        
        if (params.description.length > PINBOARD_DESC_MAX_LENGTH) {
            var trimmedDescription = params.description.slice(0, PINBOARD_DESC_MAX_LENGTH) + '...';
            descriptionTrimmed = true;
        }
        if (descriptionTrimmed) {
            extended = `<blockquote>${params.description}</blockquote>`;
            params.description = trimmedDescription;
        }

        let queryString = `?description=${params.description}&url=${params.url}&extended=${extended}&tags=${tags}&format=json&auth_token=${this.credentials.api_token}`;
        console.log(queryString);

        let xhr = new XMLHttpRequest();
        xhr.open(method, url + queryString);
        xhr.send();
        var data;
        xhr.onload = function () {
            if (xhr.status != 200) {
                throw new Error(`Error ${xhr.status}: ${xhr.statusText}`);
            }
            data = JSON.parse(xhr.responseText);
            return data;
        };
    }
}