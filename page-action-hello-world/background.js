console.log('Background page version 1');

// This listener is called when a tab becomes active
// in a window (e.g. the user clicks on the tab icon)
chrome.tabs.onActivated.addListener(function(details) {
  var tabId = details.tabId;
  var windowId = details.windowId;
  console.log('tab activated with id:',tabId,
              ' in window id: ', windowId);

  chrome.pageAction.show(tabId);
});

// This is called when a tab is updated (e.g. when
// it loads a new page or loads a favicon)
chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  console.log('updated tab id: ',tabId,
              ' to status: "',tab.status,
              '" and url: url: ',tab.url);

  chrome.pageAction.show(tabId);
});
