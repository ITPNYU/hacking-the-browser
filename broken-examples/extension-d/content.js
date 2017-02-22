chrome.runtime.onMessage.addListener(function() {

  var text = '';
  for (var i = 0; i < 25; i++) {
    text = text + ' ' + 'Malkovich';
  }
  $('p').text(text);

  $('img').attr('src', 'malkovich.jpg');
});
