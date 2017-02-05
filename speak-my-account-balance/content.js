chrome.runtime.onMessage.addListener(function(message, sender, respond) {
  var balance = findBalance();
  respond(balance);
});

function findBalance() {
  var balanceCell = $('td.datacell.emphasized:eq(0)');
  if (balanceCell.length > 0) {
    var text = balanceCell.text();
    if (/^\$/.test(text)) {
      return text.replace('$','');
    }
  }

  return 'unknown';
}
