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
    var img = '<img src="/img/play.png" title="Record"/>';
    var jq = '$(".nav").append(\'<li><a class="record play" href="#">'+img+'</li>\');';
    var remoteCode = jq + "\n" + 'new Connect("'+ key +'").start('+alerting+');';

    chrome.tabs.executeScript(tab.id, { code: remoteCode }, function() {
      chrome.pageAction.hide(tab.id);
    });
  });
});

function withKey(url, callback) {
  if (localStorage.getItem(url)) {
    callback(localStorage.getItem(url));
  }
}
