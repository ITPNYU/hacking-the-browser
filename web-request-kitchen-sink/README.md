# Web Request Kitchen Sink

This is an example extension that does nothing, but it wires up the following events:

  * `chrome.webRequest.onBeforeSendHeaders` -- can be used to add, remove or change *request* headers
  * `chrome.webRequest.onBeforeRequest` -- can be used to block or redirect requests
  * `chrome.webRequest.onHeadersReceived` -- can be used to add, remove or change *response* headers

See the [`chrome.webRequest` documentation](https://developer.chrome.com/extensions/webRequest) for more details
on these APIs, and the [background.js](./background.js) file for detailed commented notes about how to use these APIs.

The [manifest.json](./manifest.json) specifies the following permissions:
  * `"webRequest"`: Enables the chrome.webRequest APIs
  * `"webRequestBlocking"`: Enables the webRequest listeners in background.json to modify request (block, redirect, or change headers)
  * `"<all_urls>"`: This is a "host permission": It specifies which host(s) this extension can operate on. Only URLs that are allowed by
    the host permissions will be allowed by Chrome. Since it specifies all URLs, this extension can modify request for all URLs.