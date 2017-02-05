console.log('background 14!!!!!!!!!!!!!!!');
/*
chrome.history.onVisited.addListener(function() {
  console.log('history.onVisited',arguments);
});
chrome.history.search({text:""}, function(items){
  console.log('history items', items);
});
chrome.history.getVisits({url:"http://abc.go.com/"}, function() {
  console.log('visits to http://abc.go.com/',arguments);
});
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
  console.log('omnibox.onInputChanged',text,suggest);
  suggest([
    {content: text + " one", description: "the first one"},
    {content: text + " number two", description: "the second entry"}
  ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
  console.log('omnibox.onInputEntered',text);
});
*/
/*
chrome.browserAction.onClicked.addListener(function(tab) {
  console.log('clicked on tab',tab);
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    console.log('found tabs',tabs);
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});
*/

console.log('background page running 1');
chrome.tabs.getCurrent(function() {
  console.log('getCurrent',arguments);
});

chrome.tabs.onActivated.addListener(function(tabId) {
  console.log('on actived change...',arguments);
});

/*

chrome.commands.onCommand.addListener(function(command) {
  console.log('got Command:', command);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log('background got message',request,sender,sendResponse);
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
  }
);
*/
