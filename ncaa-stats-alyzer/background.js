console.log('background');
chrome.runtime.onMessage.addListener(function(message, sender, respond) {
  console.log('got message', message);

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tab = tabs[0];
    console.log('active tab',tab);
    if (!tab) {
      return;
    }

    chrome.tabs.sendMessage(tab.id, message, function(response) {
      console.log('background tab received message:',response);
      respond(response);
    });
  });

  return true;
});
