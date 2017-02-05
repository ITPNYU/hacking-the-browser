console.log('animated browser action version 1');

chrome.browserAction.onClicked.addListener(function() {
  // loop from 0 to 10, setting the icon to one of the images
  // in the images/ directory
  for (let i = 0; i <= 10; i++) {
    setTimeout(() => {
      console.log('handling i:',i);
      if (i === 10) {
        resetIcon();
      } else {
        let imagePath = "images/rose-" + i + ".png";
        chrome.browserAction.setIcon({path: imagePath});
      }
    }, i*50);
  }
});

// sets the icon back to upright (non-rotated) image
function resetIcon() {
  chrome.browserAction.setIcon({path: 'images/rose-0.png'});
}
