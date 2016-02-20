console.log('sort tabs version 1');

chrome.browserAction.onClicked.addListener(function() {
  console.log('clicked browser action');

  // Get all tabs in the current window
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    console.log('Found ' + tabs.length + ' tabs', tabs);

    // Loop through each tab and note its id and its title
    var titlesIds = [];
    tabs.forEach(function(tab) {
      titlesIds.push({title: tab.title, id: tab.id});
    });

    // Sort all of the {title, id} items in `titleIds` alphabetically by
    // the title.
    titlesIds.sort(function(a, b) {
      var aTitle = a.title.toLowerCase();
      var bTitle = b.title.toLowerCase();

      if (aTitle < bTitle) {
        return -1;
      } else if (aTitle === bTitle) {
        return 0;
      } else {
        return 1;
      }
    });

    // Loop through each of the {title, id} items in `titlesIds` and
    // move that tab's id to the index matching its index in the `titlesIds` list
    titlesIds.forEach(function(titleId, indexInTitlesIds) {
      var id = titleId.id;
      console.log('Moving tab id ' + id + ' to position ' + indexInTitlesIds);
      chrome.tabs.move(id, {index: indexInTitlesIds});
    });

    // Shows the text "Sorted!" on the icon
    chrome.browserAction.setBadgeText({text: 'Sorted!'});
  });
});
