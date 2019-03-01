# Execute code on newly-created tabs

This extension will execute some code to change the body bg color to "red" on all newly-created tabs.

Uses:

- API [`chrome.tabs.onCreated`](https://developer.chrome.com/extensions/tabs#event-onCreated)
- API [`chrome.tabs.onUpdated`](https://developer.chrome.com/extensions/tabs#event-onUpdated)
- Permissions `"tabs"` and `"<all_urls>"`

The `onCreated` API is used to get the tab id of all newly-created tabs, but at the time that they are created they
may not be done loading, so the code uses the `onUpdated` API to check for tabs that are done loading, and checks their
id to see if it equals the tab id of the last created tab. If so, it injects the code into that tab.

The `"tabs"` permission is needed to be able to read the URL of the tabs, and the `"<all_urls>"` permission is needed to
be able to inject script into that tab.
