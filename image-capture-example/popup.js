console.log('Popup version 1');

chrome.tabs.captureVisibleTab({format: 'jpeg'}, function(imageDataUrl) {
  $('#captured-image').attr('src', imageDataUrl);
});

chrome.tabs.query({active: true}, function(tabs) {
  var tab = tabs[0];
  if (tab) {
    $('#tab-title').text(tab.title);
  }
});
