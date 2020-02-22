console.log('Google-en-Español background page');

function callback(details) {
  console.group(
    `Intercepting request id ${details.requestId}: ${details.method} ${details.url}`
  );

  for (var i = 0; i < details.requestHeaders.length; i++) {
    var header = details.requestHeaders[i];
    if (header.name.toLowerCase() === 'accept-language') {
      console.log(
        `Changing accept-language header value from ${header.value} to "es"`
      );
      header.value = 'es';
    }
  }

  console.groupEnd();
  return { requestHeaders: details.requestHeaders };
}

var filter = {
  urls: ['<all_urls>']
};

var extraInfo = ['blocking', 'requestHeaders', 'extraHeaders'];

chrome.webRequest.onBeforeSendHeaders.addListener(callback, filter, extraInfo);
