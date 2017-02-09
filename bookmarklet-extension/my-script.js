// This script gets injected into the active tab when the user
// clicks the browserAction, because our background script set that up
// when it called `chrome.browserAction.onClicked.addListener`

// Because this executes on the current tab, you will see this log message
// in the DevTools for the current tab:
console.log('Making the page red');

// This uses jQuery (which we already injected) to change the page color
$('body').css({'background-color': 'red'});
