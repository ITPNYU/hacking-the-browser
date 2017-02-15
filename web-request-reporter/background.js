function callback(details) {
  var method = details.method;
  var type = details.type;
  var url = details.url;
  console.log(method, type, url);

  /**
   * Uncomment this to block facebook
  if (details.url.indexOf('facebook') !== -1) {
    return { cancel: true };
  }
  */

  /**
   * Uncomment this to replace images with cats
  if (type === 'image') {
    var catSrc = chrome.extension.getURL('cat.jpg');
    return { redirectUrl: catSrc };
  }
 */
}

var filter = {
  urls: ['<all_urls>']
};

var extraInfo = ['blocking'];

chrome.webRequest.onBeforeRequest.addListener(
  callback, filter, extraInfo);
