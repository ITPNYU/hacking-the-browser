chrome.tabs.onCreated.addListener(function(tab) {
  console.log('v3 tab creaetd!',tab);
  if (tab.url === 'chrome://newtab/') {
    console.log('newtab created!');
  }
});
