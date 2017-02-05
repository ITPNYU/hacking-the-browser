chrome.runtime.onMessage.addListener(function(message) {
  message = message.split('').join(' ');
  chrome.tts.speak('Your password is: ' + message, {enqueue: true});
});
