var chaseAccountUrl = 'https://chaseonline.chase.com/MyAccounts.aspx';

// Add listener for when a tab is updated
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status !== 'complete') {
    return;
  }
  if (tab.url.indexOf(chaseAccountUrl) !== -1) {
    speakAccountBalance(tab);
  }
});

var highBalanceMsgs = [
  'I can\'t even.',
  'If you want to transfer it to my account simply do nothing. Ok, transferring.'
];

var mediumBalanceMsgs = [
  'You are doing well, keep it up.',
  'High five.',
  'Yowza.'
];

var lowBalanceMsgs = [
  'Keep on keepin\' on.',
  'Livin\' on a prayer, are we?',
  'I am looking for a more affluent provider'
];

var poorBalanceMsgs = [
  'Ouch!',
  'I can\'t even.'
];

function randomFrom(array) {
  var len = array.length;
  var rand = Math.floor(Math.random() * len);
  return array[rand];
}

function say(msg) {
  chrome.tts.speak(msg, {enqueue: true});
}

function speakAccountBalance(tab) {
  var message = 'getBalance';
  chrome.tabs.sendMessage(tab.id, message, function(response) {
    var balance = response;
    if (balance === 'undefined') {
      say('I could not find your account balance.');
    } else {
      balance = parseFloat(balance.replace(/,/g, ''));

      say('Your balance is ' + balance + ' dollars.');
      if (balance > 100000) {
        say(randomFrom(highBalanceMsgs));
      } else if (balance > 10000) {
        say(randomFrom(mediumBalanceMsgs));
      } else if (balance > 1000) {
        say(randomFrom(lowBalanceMsgs));
      } else {
        say(randomFrom(poorBalanceMsgs));
      }
    }
  });
}
