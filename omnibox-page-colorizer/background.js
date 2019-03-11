console.log('omnibox extension version 1');

// This listener is called when the user types the keyword ("color")
// and then tab, and then some text. The `text` argument to the listener
// is the text the person wrote.
// The `suggest` argument is a function that can be used to programmatically
// add auto-complete suggestions
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  console.log('the user typed "' + text + '"');

  suggest([
    { content: 'red', description: 'make it pop!' },
    { content: 'green', description: 'make it natural' },
    { content: 'pink', description: 'make it funky' }
  ]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  console.log('the user entered: "' + text + '"');
  chrome.tabs.executeScript({
    code: `document.body.style.backgroundColor = "${text}";`
  });
});
