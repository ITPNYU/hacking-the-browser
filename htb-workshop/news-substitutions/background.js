chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked!');
  chrome.tabs.executeScript(tab.id, {file: 'replace.js'});
});
