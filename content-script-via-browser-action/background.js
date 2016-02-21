console.log('Content Script via Browser Action background page, version 1');
// Docs for 'onClicked' are here: https://developer.chrome.com/extensions/browserAction#event-onClicked
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('Clicked on tab: ', tab);

  // Message can be a string or an object.
  // See docs here: https://developer.chrome.com/extensions/tabs#method-sendMessage
  var message = 'Go!';
  chrome.tabs.sendMessage(tab.id, message);
});
