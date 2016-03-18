console.log('background');
chrome.runtime.onMessage.addListener(function(message, sender, respond) {
  console.log('got message', message);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    console.log('active tab',tab);
    if (!tab) {
      return;
    }

    chrome.tabs.sendMessage(tab.id, message, function(response) {
      console.log('background tab received message:',response);
      respond(response);
    });
  });

  return true;
});

// Add listener for when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log('updated',tabId,changeInfo,tab);
  if (changeInfo.status === 'complete') {
    if (tab.url.indexOf('sports-reference.com') !== -1) {
      console.log('showing page action');
      chrome.pageAction.show(tabId);
    }
  }
});
