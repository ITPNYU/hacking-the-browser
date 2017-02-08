// The code in this file will load:
//   * after the document is ready
//   * after any previous content scripts (e.g., jquery.js)
//
// So you can safely use jQuery (the `$`) in the code below

console.log('Hello, world! (from a content script) (version: 1)');

// change all paragraphs to light green:
$('p').css({'background-color': 'lightgreen'});
