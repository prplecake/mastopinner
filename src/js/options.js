function saveOptions(e) {
    e.preventDefault();
    console.log('saving');
    browser.storage.local.set({
        api_token: document.querySelector('#pinboard-api-token').value
    });
}

function restoreOptions() {
    function setCurrent(result) {
        document.querySelector('#pinboard-api-token').value = result.api_token;
    }

    browser.storage.local.get('api_token', setCurrent);
}


document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector('form').addEventListener('submit', saveOptions);
