var httpCount = 0;
var httpsCount = 0;

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'complete') {
    return;
  }
  var url = tab.url;
  console.log('visited:',url);

  if (url.indexOf('https://') === 0) {
    httpsCount++;
  } else if (url.indexOf('http://') === 0) {
    httpCount++;
  }

  updateBadge();
});

function updateBadge() {
  var total = httpCount + httpsCount;
  var ratio = httpsCount / total;
  var percentage = Math.round(ratio * 100);
  chrome.browserAction.setBadgeText({
    text: percentage + '%'
  });
  chrome.browserAction.setTitle({
    title: 'You have visited ' + total + ' pages, ' + percentage + '% of which were https.'
  });

  if (ratio > 0.5) {
    // green
    chrome.browserAction.setBadgeBackgroundColor({
      color: '#00FF00'
    });
  } else {
    // red
    chrome.browserAction.setBadgeBackgroundColor({
      color: '#FF0000'
    });
  }
}

