Detect all upper-cased text sections on the page when the action is clicked.

Uses the `chrome.browserAction.onClicked.addListener` API and the
`chrome.tabs.insertCSS` and `chrome.tabs.executeScript` APIs to inject the
content script (and a stylesheet) when the user clicks the browser action.

Because the content script is only inserted after the user clicks the icon, the
only necessary permission is `"activeTab"`.

Icon credit: text box by TiRo from the Noun Project
(https://thenounproject.com/search/?q=capital+letter&i=555292).
