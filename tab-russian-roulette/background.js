chrome.browserAction.onClicked.addListener(function() {
  closeRandomTab(animateIcon);
});

function animateIcon() {
  let iconPrefix = 'icons-rotated/hand-gun-19';
  let iconSuffix = '.png';
  let delay = 50;
  let positions = [
    '', // 0
    '--75',
    '--15',
    '--75',
    '', // 0
    '-75',
    '-15',
    '-225',
    '-15',
    '-75',
    ''
  ];

  function nextIcon() {
    if (positions.length === 0) { return; }

    let position = positions.shift();
    let icon = `${iconPrefix}${position}${iconSuffix}`;
    chrome.browserAction.setIcon({path: icon}, () => {
      setTimeout(nextIcon, delay);
    });
  }
  nextIcon();
}

function random(array) {
  var length = array.length;
  var idx = Math.floor(Math.random()*length);
  return array[idx];
}

function closeRandomTab(callback) {
  chrome.tabs.query({}, function(tabs) {
    var randomTab = random(tabs);
    chrome.tabs.remove(randomTab.id);
    callback();
  });
}
