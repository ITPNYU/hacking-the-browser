console.log('popup!');
$(document).ready(function() {
  console.log('ready!');
  chrome.runtime.sendMessage({event: 'stats'}, function(response) {
    console.log('popup received response', response);
    handleMessage(response);
  });
});

function handleMessage(message) {
  var type = message.type;
  if (type === 'error') {
    alert('error!');
  } else if (type === 'stats') {
    handleStats(message.stats);
  }
}

function handleStats(stats) {
  $('#loading').remove();
  $('#team-name').html(stats.teamName);
  $('#name').html(stats.teamName);
  $('#last-10').html(stats.last10);
  $('#wins').html(stats.wins);
  $('#losses').html(stats.losses);
  $('#wins-plus-close').html(stats.wins + stats.closeLosses);
  $('#losses-minus-close').html(stats.losses - stats.closeLosses);
  $('#road-wins').html(stats.roadWins);
  $('#road-losses').html(stats.roadLosses);
  $('#streaks').html(stats.streaks.join(','));
  $('#sos').html(stats.rankings.SOS);
  $('#ortg').html(stats.rankings.ORtg);
  $('#drtg').html(stats.rankings.DRtg);
  $('#srs').html(stats.rankings.SRS);
  $('#ranking').html(stats.ranking);

  var startNode = $('#name')[0].firstChild;
  var endNode = $('#streaks')[0].firstChild;
  var range = document.createRange();
  range.setStart(startNode, 0);
  range.setEnd(endNode, endNode.textContent.length);
  var selection = window.getSelection();
  selection.removeAllRanges();
  selection.addRange(range);
}
