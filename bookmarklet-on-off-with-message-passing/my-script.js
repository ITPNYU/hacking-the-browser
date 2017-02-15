// When the user clicks the browserAction, it sends a message to this
// script, and we decide here whether to make the page red, or not-red.

console.log('bookmarklet on-off extension');

var pageIsNormal = true;

chrome.runtime.onMessage.addListener(function(message) {
  console.log('received message from background script: ', message);

  if (pageIsNormal) {
    makePageRed();
    pageIsNormal = false;
  } else {
    makePageNormal();
    pageIsNormal = true;
  }
});

function makePageRed() {
  console.log('making page red');
  // This uses jQuery (which we already injected) to change the page color
  $('body').css({'background-color': 'red'});
}

function makePageNormal() {
  console.log('making page normal');
  $('body').css({'background-color': 'inherit'});
}
