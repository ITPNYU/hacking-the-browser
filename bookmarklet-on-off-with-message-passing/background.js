// console.log statements in this file will appear in the DevTools
// panel that appears when you click "inspect page" on the
// chrome://extensions page

console.log('Bookmarklet on/off Extension background.js');

chrome.browserAction.onClicked.addListener(function(tab) {
  var tabId = tab.id;

  console.log('sending message "toggle"');
  chrome.tabs.sendMessage(tabId, 'toggle');
});
