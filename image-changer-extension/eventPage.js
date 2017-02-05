/* global chrome */
console.log('hello9');
chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    console.log('got reqeust!',info.url);
    var size = Math.floor(Math.random() * 500 + 100);
    return {redirectUrl: 'http://www.nicenicejpg.com/' + size + '.jpg'};
  },
  {
    urls: [
      'http://www.nicenicejpg.com/500.*'
    ],
    types: ['image']
  },
  ['blocking']
);
