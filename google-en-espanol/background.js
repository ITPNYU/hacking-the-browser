function callback(details) {
  for (var i = 0; i < details.requestHeaders.length; i++) {
    var header = details.requestHeaders[i];
    if (header.name.toLowerCase() === 'accept-language') {
      console.log('will send header',header.name, header.value);
      header.value = 'es';
    }
  }

  return { requestHeaders: details.requestHeaders };
}

var filter = {
  urls: ['<all_urls>']
};

var extraInfo = ['blocking', 'requestHeaders'];

chrome.webRequest.onBeforeSendHeaders.addListener(
  callback, filter, extraInfo);
