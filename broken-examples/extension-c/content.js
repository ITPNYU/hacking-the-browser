chrome.runtime.onMessage.addListener(function(message) {
  document.body.style.backgroundColor = 'red';
  document.body.style.color = 'red';
});
