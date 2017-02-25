chrome.browserAction.onClicked.addListener(function(tab) {
  var tabId = tab.id;
  chrome.tabs.sendMessage(tabId, "go");
});
