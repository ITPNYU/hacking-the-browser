console.log('background of execute-code-on-activated-tab');

// Global variable that we use to keep track of the
let lastCreatedTabId;

// Documentation for `onCreated`: https://developer.chrome.com/extensions/tabs#event-onCreated
chrome.tabs.onCreated.addListener(function(tab) {
  console.log(`Created tab id: ${tab.id}`);
  lastCreatedTabId = tab.id;
});

// Documentation for `onUpdated`: https://developer.chrome.com/extensions/tabs#event-onUpdated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (tabId !== lastCreatedTabId) {
    console.log(
      `Updated tab id ${tabId} that !== lastCreatedTabId ${lastCreatedTabId}, ignoring`
    );
    return;
  }

  // status can be "loaded", "complete" or "undefined", according to the docs
  let status = changeInfo.status;

  // We can read the tab's url because the manifest includes the "tabs" permission
  let url = tab.url;

  console.log(
    `Updated the most-recently-created tab: ${tabId}: Status "${status}", url: ${url}`
  );

  // Ignore chrome://* urls because extensions are not allowed to inject code into those
  if (url.startsWith('chrome://')) {
    console.log(`Ignoring chrome url ${url}`);
    return;
  }

  // Only do things to tabs that are completed loading. Otherwise, the DOM of that tab may not be ready
  if (status === 'complete') {
    console.log(`Injecting code into tab ${tabId}`);

    // In order to inject code into an arbitrary tab, the manifest *also* needs a url match-pattern permission.
    // This manifest uses the "<all_urls>" pattern so that it can inject into a tab with *any* url.
    chrome.tabs.executeScript(tabId, {
      code: 'document.body.style.backgroundColor = "red"'
    });
  }
});
