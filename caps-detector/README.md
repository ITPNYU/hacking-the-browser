Detect all upper-cased text sections on the page when the action is clicked.

Uses the `chrome.browserAction.onClicked.addListener` API and the
`chrome.tabs.executeScript` API to inject the content script when the user
clicks the browser action.
