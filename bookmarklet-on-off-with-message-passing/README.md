This example extension adds a browser action that, when clicked, makes the
active tab's page red.

It uses:
  * a background script to wire the click listener on the active tab
  * the "activeTab" permission so that it can inject a script into the active
    tab
  * the `chrome.tabs.executeScript` API to inject jquery.js and then
    my-script.js
  * the `chrome.tabs.insertCSS` API to insert my-styles.css

Read about the "activeTab" permission here:
  https://developer.chrome.com/extensions/activeTab

Read about tabs.executeScript here:
  https://developer.chrome.com/extensions/tabs#method-executeScript

Read about tabs.insertCSS here:
  https://developer.chrome.com/extensions/tabs#method-insertCSS
