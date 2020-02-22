function callback(details) {
  for (var i = 0; i < details.requestHeaders.length; i++) {
    var header = details.requestHeaders[i];
    if (header.name.toLowerCase() === 'accept-language') {
      console.log('would have sent header', header.name, header.value);
      header.value = 'es';
      console.log('changed header', header.name, 'to: "es" instead');
    }
  }

  return { requestHeaders: details.requestHeaders };
}

var filter = {
  urls: ['<all_urls>']
};

var extraInfo = ['blocking', 'requestHeaders', 'extraHeaders'];

chrome.webRequest.onBeforeSendHeaders.addListener(callback, filter, extraInfo);
