console.log('Content Script via Browser Action background page, version 1');
// Docs for 'onClicked' are here:
// https://developer.chrome.com/extensions/browserAction#event-onClicked

chrome.browserAction.onClicked.addListener(function() {
  console.log('Clicked the browser action!');

  // first, inject jquery:
  chrome.tabs.executeScript({file: 'jquery.js'}, function() {
    // jquery is injected, *now* inject our content script
    console.log('background script injected jquery');

    chrome.tabs.executeScript({file: 'content_script.js'}, function() {
      console.log('background script injected content_script');
    });
  });

  // If you want to inject a CSS file, uncomment the code below
  // For more details on this method,
  // see: https://developer.chrome.com/extensions/tabs#method-insertCSS
  chrome.tabs.insertCSS({file: 'mystyles.css'}, function() {
    console.log('background script inserted mystyles.css');
  });
});
