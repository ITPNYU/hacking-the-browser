console.log('Basic Request Blocker version 1');

function inspectRequest(details) {
  if (details.url.indexOf('http') !== 0) {
    // skip chrome-extension://, file://, etc urls
    return;
  }

  var urlDetails = getLocation(details.url);
  console.log('Request for host: "'+urlDetails.host+'" pathname: "'+urlDetails.pathname+'"');
}

function facebookBlocker() {
  console.log('Blocking facebook request');
  return { cancel: true };
}

function maybeBlockReddit() {
  var hourOfDay = new Date().getHours(); // 0-23
  if (hourOfDay < 12) {
    console.log('Blocking reddit before noon');
    return { cancel: true };
  }
}

function redirectBingToGoogle() {
  console.log('redirecting Bing to Google');
  return { redirectUrl: 'http://google.com' };
}

function replaceDogImageWithCat(details) {
  if (details.url.indexOf('http') !== 0) {
    // skip chrome-extension://, file://, etc urls
    return;
  }

  // pathname is the part after the "/",
  // e.g. http://example.com/a/b/c/dog.jpg -> pathname = "/a/b/c/dog.jpg"
  var pathname = getLocation(details.url).pathname;

  // If the pathname has the text "dog" in it, replace with our "cat.jpg"
  // Note that "cat.jpg" must be in "web_accessible_resources" in the
  // manifest.json
  if (pathname.toLowerCase().indexOf('dog') !== -1) {
    // The chrome api chrome.extension.getURL gets the absolute URL
    // to this asset (the URL will look like: chrome-extension://abcdefgh/cat.jpg
    var replacement = chrome.extension.getURL('cat.jpg');
    console.log(`Replacing request for ${details.url} with cat image: ${replacement}`);
    return { redirectUrl: replacement };
  }
}

// The `facebookBlocker` will only be run for facebook urls in the main frame
chrome.webRequest.onBeforeRequest.addListener(facebookBlocker, {
  urls: ['*://*.facebook.com/*'],   //  <-- only run for facebook urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request

// This will run `maybeBlockReddit` for all reddit urls in the main frame
chrome.webRequest.onBeforeRequest.addListener(maybeBlockReddit, {
  urls: ['*://*.reddit.com/*'],     //  <-- only run for facebook urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request

// This will run `inspectRequest` for all URLs in the main frame
chrome.webRequest.onBeforeRequest.addListener(inspectRequest, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, ['blocking']);

// This will run `redirectBingToGoogle` for all bing urls in the main frame
chrome.webRequest.onBeforeRequest.addListener(redirectBingToGoogle, {
  urls: ['*://*.bing.com/*'],
  types: ['main_frame']
}, ['blocking']);

// This will run `replaceDogImageWithCat` for all urls that are image requests
chrome.webRequest.onBeforeRequest.addListener(replaceDogImageWithCat, {
  urls: ['<all_urls>'],            // <-- all urls
  types: ['image']                 // <-- only "image" requests are looked for
}, ['blocking']);

// see http://stackoverflow.com/questions/736513/how-do-i-parse-a-url-into-hostname-and-path-in-javascript
function getLocation(href) {
  var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
  return match && {
    protocol: match[1],
    host: match[2],
    hostname: match[3],
    port: match[4],
    pathname: match[5],
    search: match[6],
    hash: match[7]
  };
}
