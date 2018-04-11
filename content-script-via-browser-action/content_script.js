// This script needs jQuery present to run,
// so the background script must inject jQuery *before* it
// injects this one.

console.log('Hello, world! (from a content script) (version: 1)');

$('body').css({'background-color': 'red'});
