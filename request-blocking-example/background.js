console.log('Basic Request Blocker version 1');

function inspectRequest(details) {
  if (details.url.indexOf('http') !== 0) {
    // skip chrome-extension://, file://, etc urls
    return;
  }

  var urlDetails = getLocation(details.url);
  console.log('Request for host:',urlDetails.host,'pathname:',urlDetails.pathname);
}

function facebookBlocker() {
  console.log('Blocking facebook request');
  return { cancel: true };
}

function maybeBlockReddit() {
  var hourOfDay = new Date().getHours(); // 0-23
  if (hourOfDay < 12) {
    console.log('Blocking reddit after noon');
    return { cancel: true };
  }
}

function redirectBingToGoogle(details) {
  console.log('redirecting ' + details.url + ' to Google');
  return { redirectUrl: 'http://google.com' };
}

// The `facebookBlocker` will only be run for facebook urls
chrome.webRequest.onBeforeRequest.addListener(facebookBlocker, {
  urls: ['*://*.facebook.com/*'],   //  <-- only run for facebook urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request

// This will run `maybeBlockReddit` for all reddit urls
chrome.webRequest.onBeforeRequest.addListener(maybeBlockReddit, {
  urls: ['*://*.reddit.com/*'],   //  <-- only run for facebook urls
  types: [ 'main_frame' ]           //  <-- only for web requests in the main frame
}, ['blocking']);                   //  <-- this has to be here so that we can stop the request

// This will run `inspectRequest` for all URLs
chrome.webRequest.onBeforeRequest.addListener(inspectRequest, {
  urls: ['<all_urls>'],
  types: ['main_frame']
}, ['blocking']);

// This will run `redirectBingToGoogle` for all bing urls
chrome.webRequest.onBeforeRequest.addListener(redirectBingToGoogle, {
  urls: ['*://*.bing.com/*'],
  types: ['main_frame']
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
