// console.log statements in this file will appear in the DevTools
// panel that appears when you click "inspect page" on the
// chrome://extensions page

console.log('Bookmarklet Extension background.js');

chrome.browserAction.onClicked.addListener(function() {
  // This function will execute whenever you click 
  console.log('Clicked browser action');

  /*
    Because this extension has the "activeTab" permission,
    the chrome.tabs.executeScript and chrome.tabs.insertCSS
    functions are available
    
    Read about the "activeTab" permission here:
      https://developer.chrome.com/extensions/activeTab
    
    Read about tabs.executeScript here:
      https://developer.chrome.com/extensions/tabs#method-executeScript
    
    Read about tabs.insertCSS here:
      https://developer.chrome.com/extensions/tabs#method-insertCSS
  */

  // If you have a single script you want to execute, you can do so like this:
  // chrome.tabs.executeScript(null, {file: 'my-script.js'});

  // If you have multiple scripts that have to be run sequentially, you
  // need to use callbacks. This example injects jQuery first, and then
  // injects my-script.js:
  chrome.tabs.executeScript(null, {file: 'jquery.js'}, function() {
    // This function only executes *after* jquery has been injected
    chrome.tabs.executeScript(null, {file: 'my-script.js'});
  });

  // This injects a CSS file that makes text red:
  chrome.tabs.insertCSS(null, {file: 'my-styles.css'});
});
