chrome.runtime.onMessage.addListener(function() {

  var text = '';
  for (var i = 0; i < 25; i++) {
    text = text + ' ' + 'Malkovich';
  }
  $('p').text(text);

  var src = chrome.extension.getURL('malkovich.jpg');
  $('img').attr('src', src);
});
