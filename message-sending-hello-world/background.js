console.log('background version 1');

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  var tabId = tab.id;
	console.log('clicked browserAction in tab id: ',tabId);

  var message = {"changeColor": true, "color": "red"};

  // Send a message to the active tab
  chrome.tabs.sendMessage(tabId, message);
});
