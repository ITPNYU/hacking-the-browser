chrome.webRequest.onBeforeSendHeaders.addListener(
  function(details) {
    // details includes the following properties:

    // Method: GET, POST, etc
    // let method = details.method;

    // URL
    // let url = details.url;

    // Request Headers: An array of {name, value} objects, e.g.:
    // [{name: 'User-Agent', value: 'Mozilla...'}, {name: 'Cookie', value: '...'}]

    // This is a normal array and can be modified like any array (use `push` to add new entries, for example)
    // let requestHeaders = details.requestHeaders;

    // Type: string such as "main_frame" or "script" or "stylesheet", "image", etc.
    // let type = details.type;

    // Uncomment the below to log details:
    // console.log(`onBeforeSendHeaders: Request id ${details.requestId}: "${details.method} ${details.url}" (type: ${details.type})`);

    // To send different headers return an object with `requestHeaders`, like this:
    // let differentHeaders = [{name:'a-header',value:'something'}, {name:'other-header',value:'something-else'}];
    // return {requestHeaders: differentHeaders};
  },

  // Filters: This filter says to run this callback for all URLs. It can be changed to
  // specify more specific URLs, or certain request types.
  {
    urls: ['<all_urls>']
  },

  // "Extra Info" Spec: "blocking" says that this callback might modify (change headers) the request,
  // "requestHeaders" makes sure that `details` includes the request headers, and "extraHeaders" makes it so
  // the details includes some extra (more privacy-sensitive) headers that would normally not be provided by Chrome
  ['requestHeaders', 'extraHeaders', 'blocking']
);

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    // details includes the same properties as the `onBeforeSendHeaders` callback above.

    // Uncomment the below to log details:
    // console.log(`onBeforeRequest: Request id ${details.requestId}: "${details.method} ${details.url}" (type: ${details.type})`);

    // To cancel this request, uncomment the line below
    // return { cancel: true };

    // To cancel requests for facebook, uncomment below
    // if (details.url.includes('facebook.com')) {
    //   return {cancel: true};
    // }


    // To redirect this request to another URL instead, uncomment the return statement below
    // Note: This works best if you use the details of this request to ensure that only certain
    // specific requests are redirected
    // return { redirectUrl: 'https://www.google.com' };

    // To redirect *only* "image" type requests to a cat image that is part of this
    // extension, uncomment below. The `getURL` method will only work if the cat.jpg
    // is specified in the "web_accessible_resources" part of the manifest.json
    // if (details.type === 'image') {
    //   let catURL = chrome.extension.getURL('cat.jpg');
    //   return { redirectUrl: catURL };
    // }
  },

  // Filters: This filter says to run this callback for all URLs. It can be changed to
  // specify more specific URLs, or certain request types.
  {
    urls: ['<all_urls>']
  },

  // "Extra Info" Spec: "blocking" says that this callback might modify (block or redirect) the request,
  // and "requestBody" makes it so that `details` object will have extra information about the requestBody (form data)
  // in the request
  ['blocking', 'requestBody']
);

chrome.webRequest.onHeadersReceived.addListener(function(details) {
    // details includes the same properties as the `onBeforeSendHeaders` and `onBeforeRequest` callbacks above.

    // It also includes info on the *response* headers from the server:
    // Response Headers: An array of {name, value} objects, e.g.:
    // [{name: 'User-Agent', value: 'Mozilla...'}, {name: 'Cookie', value: '...'}]
    // let headers = details.responseHeaders;

    // Uncomment the below to log details:
    console.log(`onHeadersReceived: Request id ${details.requestId}: "${details.method} ${details.url}" (type: ${details.type})`);


    // To change the HTTP response headers that the browser receives (for instance, to delete cookies,
    // or to add new headers), return an object with a `responseHeaders` key, like this:
    // let differentHeaders = [{name:'a-header',value:'something'}, {name:'other-header',value:'something-else'}];
    // return {responseHeaders: differentHeaders};
  },

  // Filters: This filter says to run this callback for all URLs. It can be changed to
  // specify more specific URLs, or certain request types.
  {
    urls: ['<all_urls>']
  },

  // "Extra Info" spec: "blocking" says that this callback might modify the response headers,
  // "responseHeaders" makes sure that `details` object contains the headers, and "extraHeaders"
  // makes sure that the headers will include some extra (privacy-sensitive) headers that aren't
  // normally provided by Chrome
  ['blocking', 'responseHeaders', 'extraHeaders']
);
