chrome.browserAction.onClicked.addListener(function(tab) {
  var tabId = tab.id;
  chrome.tabs.sendMessage(5, "go");
});
