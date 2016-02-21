// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) anytime in the code below

console.log('Hello, world! (from a content script) (version: 1)');

// Add a listener for a message from the background.js
// "chrome.runtime" is one of the few chrome extension APIs available
// to a content script
// See docs here: https://developer.chrome.com/extensions/runtime#event-onMessage
chrome.runtime.onMessage.addListener(function(message) {
  console.log('Got message: ', message);

  // The only message we expect is the "Go!" message, so this conditional
  // isn't necessary, but you could use it to take different actions
  // depending on what message was sent.
  if (message === 'Go!') {
    console.log('Making all paragraphs red');
    // change all paragraphs to red:
    $('p').css({'background-color': 'red'});
  }
});

