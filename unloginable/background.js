function callback(details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    var header = details.responseHeaders[i];
    if (header.name.toLowerCase() === 'set-cookie') {
      console.log('blocking cookie',header.value);
      details.responseHeaders.splice(i,1);
    }
  }

  return { responseHeaders: details.responseHeaders };
}

var filter = {
  urls: ['<all_urls>']
};

var extraInfo = ['blocking', 'responseHeaders'];

chrome.webRequest.onHeadersReceived.addListener(
  callback, filter, extraInfo);
