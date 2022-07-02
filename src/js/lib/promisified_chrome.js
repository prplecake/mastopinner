// Helper: takes a function that normally uses a callback as the last argument,
// and returns a function which returns a Promise instead.
function _toPromise(fn) {
    return function(...args) {
      return new Promise((resolve, reject) => {
        try {
          fn(...args, function(...res) {
            if (chrome.runtime.lastError) { throw chrome.runtime.lastError; }
            else { resolve(...res); }
          });
        } catch(e) { reject(e); }
      });
    };
  }
  
  chromeStorageLocalGet = _toPromise(chrome.storage.local.get.bind(chrome.storage.local));
  chromeStorageLocalSet = _toPromise(chrome.storage.local.set.bind(chrome.storage.local));
  
  chromeRuntimeSendMessage = _toPromise(chrome.runtime.sendMessage);
  
  if (chrome.tabs) {
    chromeTabsInsertCSS = _toPromise(chrome.tabs.insertCSS);
    chromeTabsExecuteScript = _toPromise(chrome.tabs.executeScript);
  }
  
  // Ensure executeScript will have a return value to serialize.
  undefined;
  