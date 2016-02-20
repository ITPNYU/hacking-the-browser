console.log('Web request blocking version 1');

var ALLOW_COOKIES = ['nytimes', 'ft.com'];

function changeRefer(details) {
  console.log('running changeRefer',details);
  var foundReferer = false;
  var foundUA = false;

  var reqHeaders = details.requestHeaders.filter(function(header) {
    console.log('checking header', header.name);
    // block cookies by default
    if (header.name !== 'Cookie') {
      return header;
    }

    var allowHeader = ALLOW_COOKIES.map(function(url) {
      if (details.url.includes(url)) {
        return true;
      }
    });
    if (allowHeader.filter(Boolean) === true) {
      return header;
    }
  }).map(function(header) {
    if (header.name === 'Referer') {
      header.value = 'https://www.google.com/';
      foundReferer = true;
    }
    if (header.name === 'User-Agent') {
      header.value = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
      foundUA = true;
    }
    return header;
  });

  // set referer if it wasn't modified
  if (!foundReferer) {
    reqHeaders.push({
      'name': 'Referer',
      'value': 'https://www.google.com/'
    });
  }

  // set User Agent if it wasn't modified
  if (!foundUA) {
    reqHeaders.push({
      'name': 'User-Agent',
      'value': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
    });
  }
  console.log('reqHeaders', reqHeaders);
  return {requestHeaders: reqHeaders};
}

function blockCookies(details) {
  for (var i = 0; i < details.responseHeaders.length; ++i) {
    if (details.responseHeaders[i].name === 'Set-Cookie') {
      console.log('removing cookied',details.responseHeaders[i].value);
      details.responseHeaders.splice(i, 1);
    }
  }
  return {responseHeaders: details.responseHeaders};
}

chrome.webRequest.onBeforeSendHeaders.addListener(changeRefer, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, ['requestHeaders', 'blocking']);

chrome.webRequest.onHeadersReceived.addListener(blockCookies, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, ['responseHeaders', 'blocking']);
