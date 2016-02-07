console.log('omnibox extension version 1');

// This listener is called when the user types the keyword ("itp")
// and then tab, and then some text. The `text` argument to the listener
// is the text the person wrote.
// The `suggest` argument is a function that can be used to programmatically
// add auto-complete suggestions
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  console.log('the user typed "' + text + '"');

  var suggestion1 = text + " and some stuff";
  var suggestion2 = text + " and other stuff";

  suggest([
    {content: suggestion1, description: "some stuff"},
    {content: suggestion2, description: "some other stuff"}
  ]);
});

chrome.omnibox.onInputEntered.addListener(function(text) {
  console.log('the user entered: "' + text + '"');
});
