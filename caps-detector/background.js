chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.insertCSS(null, {file: 'highlight.css'}, function() {
    chrome.tabs.executeScript(null, {file: 'caps-detector.js'});
  });
});
