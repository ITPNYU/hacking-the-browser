chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked');

  chrome.tabs.sendMessage(tab.id, 'Go!');
});
