var VIA_TWITTER = ["wsj.com"]

function changeRefer(details) {

  foundReferer = false;
  foundUA = false;

  var useTwitter = VIA_TWITTER.map(function(url) {
    if (details.url.includes(url)) {
      return true;
    }
    return false;
  })
  .reduce(function(a, b) { return a || b}, false);

  var reqHeaders = details.requestHeaders.filter(function(header) {

    // block cookies by default
    if (header.name !== "Cookie") {
      return header;
    } 

  }).map(function(header) {
    
    if (header.name === "Referer") {
      header.value = setRefer(useTwitter);
      foundReferer = true;
    }
    if (header.name === "User-Agent") {
      header.value = setUserAgent(useTwitter);
      foundUA = true;
    }
    return header;
  })
  
  // append referer
  if (!foundReferer) {
    reqHeaders.push({
      "name": "Referer",
      "value": setRefer(useTwitter)
    })
  }
  if (!foundUA) {
    reqHeaders.push({
      "name": "User-Agent",
      "value": setUserAgent(useTwitter)
    })
  }
  return {requestHeaders: reqHeaders};
}

function blockCookies(details) {
  for (var i = 0; i < details.responseHeaders.length; ++i) {
    if (details.responseHeaders[i].name === "Set-Cookie") {
      details.responseHeaders.splice(i, 1);
    }
  }
  return {responseHeaders: details.responseHeaders};
}

function setRefer(useTwitter) {
  if (useTwitter) return "https://t.co/T1323aaaa"; 
  else return "https://www.google.com/";
}

function setUserAgent(useTwitter) {
  if (useTwitter) return "Mozilla/5.0 (iPhone; CPU iPhone OS 10_2 like Mac OS X) AppleWebKit/602.1.32 (KHTML, like Gecko) Mobile/14C92 Twitter for iPhone";
  else return "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
}

chrome.webRequest.onBeforeSendHeaders.addListener(changeRefer, {
  urls: ["<all_urls>"],
  types: ["main_frame"],
}, ["requestHeaders", "blocking"]);

chrome.webRequest.onHeadersReceived.addListener(blockCookies, {
  urls: ["<all_urls>"],
  types: ["main_frame"],
}, ["responseHeaders", "blocking"]);
