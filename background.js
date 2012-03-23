chrome.tabs.onUpdated.addListener(function(tabId, info, tab) {
  if (tab.url.match(/\/robot\-vision\.html$/)) {
    withKey(tab.url, function(key) {
      chrome.pageAction.show(tabId);
    });
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  withKey(tab.url, function(key) {
    console.log("Injecting into: " + tab.url);

    var alerting = 'function(m){alert("Problem: " + m);}';
    var remoteCode = 'new Connect("'+ key +'").start('+alerting+');';

    chrome.tabs.executeScript(tab.id, { code: remoteCode }, function() {
      chrome.pageAction.hide(tab.id);
    });
  });
});

function withKey(url, callback) {
  if (localStorage.getItem(url) !== undefined) {
    callback(localStorage.getItem(url));
  }
}
