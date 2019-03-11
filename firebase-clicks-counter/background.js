// To turn OFF logging, uncomment the line below
// setFirebaseLogging(false);

onFirebaseDataChange('clicks', function(count) {
  // If we never set this value yet, it will be undefined
  if (count === undefined) {
    count = 0;
  }

  // This variable must be a string when we pass it to setBadgeText
  let badgeText = `${count}`;

  // Update the text of the browser action
  chrome.browserAction.setBadgeText({
    text: badgeText
  });

  // Now update the color of the browser action
  let color;
  if (count < 300) {
    color = '#00aa3b'; // green
  } else if (count < 400) {
    color = '#c3d100'; // yellow
  } else {
    color = '#ba0600'; // red
  }
  chrome.browserAction.setBadgeBackgroundColor({ color: color });
});

chrome.browserAction.onClicked.addListener(function() {
  getFirebaseData('clicks', function(count) {
    if (count === undefined) {
      count = 0;
    }

    if (count > 500) {
      // reset back to 0
      count = 0;
    }

    // Increment the count
    setFirebaseData('clicks', count + 1);
  });
});
