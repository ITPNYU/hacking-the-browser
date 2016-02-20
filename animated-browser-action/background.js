console.log('animated browser action version 1');

chrome.browserAction.onClicked.addListener(function() {

  // loop from 0 to 10, setting the icon to one of the images
  // in the images/ directory
  for (var i = 0; i < 11; i++) {
    setTimeout(function(i) {
      return function() {
        if (i === 10) {
          // reset to upright (icon 0) at the end of the loop
          i = 0;
        }
        // e.g. "images/rose-3.png"
        var imagePath = 'images/rose-' + i + '.png';
        chrome.browserAction.setIcon({path: imagePath});
      };
    }(i), i*50);
  }
});
