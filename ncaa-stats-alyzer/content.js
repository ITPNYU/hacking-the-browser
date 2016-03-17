console.log('content script');
chrome.runtime.onMessage.addListener(function(message, sender, respond) {
  console.log('content script received message!', message);

  var stats = scrapeStats();
  var response = {type: 'stats', stats: stats};
  console.log('content script sending response!',response);
  respond(response);
});

function scrapeStats() {
  var teamName = $('#info_box h1').html().split('<br>')[0] .replace('2015-16 ', '');
  var wins = 0;
  var losses = 0;
  var closeLosses = 0;
  var closeLossThreshold = 5;
  var roadWins = 0;
  var roadLosses = 0;
  var streaks = [];
  var streakThreshold = 5;
  var record = [];
  var streak = 0;

  var scheduleTable = $('#schedule');
  var rows = scheduleTable.find('tbody tr');
  rows.each(function() {
    var row = $(this);
    if (row.hasClass('no_ranker')) { return; }

    var type = row.find('td:eq(5)').text();
    if (type === 'N') { return; }

    var isRoad = type === '@';
    var isWin = row.find('td:eq(8)').text() === 'W';
    var points = parseInt(row.find('td:eq(9)').text(), 10);
    var oppPoints = parseInt(row.find('td:eq(10)').text(), 10);

    if (isWin) {
      record.push(1);
      streak++;
      wins++;
      if (isRoad) {
        roadWins++;
      }
    } else {
      if (streak >= streakThreshold) {
        streaks.push(streak);
      }
      streak = 0;
      record.push(0);
      losses++;
      if (isRoad) {
        roadLosses++;
      }
      if (oppPoints - points <= closeLossThreshold) {
        closeLosses++;
      }
    }
  });

  if (streak >= streakThreshold) {
    streaks.push(streak);
  }

  var last10 = record.slice(record.length - 10).reduce(function(prev, cur) {
    return prev + cur;
  }, 0);

  record = wins + '-' + losses;
  var closeRecord = (wins + closeLosses) + '-' + (losses - closeLosses);
  var roadRecord = roadWins + '-' + roadLosses;

  var rankingTypes = {
    'SOS': {text: 'SOS', url: '#sos'},
    'SRS': {text: 'SRS', url: '#srs'},
    'ORtg': {text: 'ORtg', url: '#off_rtg'},
    'DRtg': {text: 'DRtg', url: '#def_rtg'}
  };

  var rankings = {};
  Object.keys(rankingTypes).forEach(function(key) {
    try {
      var details = rankingTypes[key];
      var span = $(
        'span:contains("' + details.text + '") > a[href*="' + details.url + '"]'
      ).parent('span')[0];
      if (span) {
        var textNode = span.nextSibling;
        var match = textNode.textContent.match(/[\d\.\-]+/);
        if (match) {
          rankings[key] = parseFloat(match);
        }
      }
    } catch(e) {
      console.log('ERROR!',e);
    }
  });
  var ranking;
  var rankingContainer = $('p:contains(seed in)');
  if (rankingContainer) {
    var match = rankingContainer.text().match(/#(\d+) seed/);
    if (match && match[1]) {
      ranking = parseInt(match[1], 10);
    }
  }

  return {
    teamName: teamName, wins: wins, losses: losses,
    closeLosses: closeLosses, roadWins: roadWins, roadLosses: roadLosses,
    streaks: streaks, last10: last10, record: record,
    closeRecord: closeRecord, roadRecord: roadRecord, rankings: rankings,
    ranking: ranking
  };
}
