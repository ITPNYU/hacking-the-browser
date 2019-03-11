// To turn OFF logging, uncomment the line below
// setFirebaseLogging(false);

// This will use chrome.storage.sync and Math.random to either create and set a new
// userId or read the existing userId from storage.
// This makes it so that every person who installs the extension has their own unique user id.
// It also means that every time you remove and re-add the extension it will create a new user id.
// If you want to use the same userId every time, uncomment this line:
// var userId = "my-user-id";
function getOrCreateUserId(callback) {
  console.log('getOrCreateUserId');
  chrome.storage.sync.get(['userId'], function(results) {
    var userId = results['userId'];
    if (userId) {
      callback(userId);
    } else {
      userId = Math.floor(Math.random() * 1000000); // random integer between 0-1M
      chrome.storage.sync.set({ userId: userId }, function() {
        callback(userId);
      });
    }
  });
}

// This fetches the window and tab counts and then calls the callback with
// the metrics information
function getMetrics(callback) {
  // These values will be updated below
  var tabCount = 0,
    windowCount = 0;

  // see https://developer.chrome.com/extensions/tabs#type-Tab
  // this shows all the properties that a Tab can have

  // See https://developer.chrome.com/extensions/windows#method-getAll
  chrome.windows.getAll({ populate: true }, function(windows) {
    windowCount = windows.length;
    console.log(`${windowCount} windows`);

    for (let i = 0; i < windows.length; i++) {
      let window = windows[i];
      let tabs = window.tabs;

      console.log(`window id #${window.id} has ${tabs.length} tabs`);

      tabCount += tabs.length;
    }

    if (callback) {
      callback({ tabCount: tabCount, windowCount: windowCount });
    }
  });
}

// Saves the metrics with the current timestamp to the current user's id.
function saveMetrics(metrics) {
  var timestamp = Date.now(); // a unix timestamp like 1524757760592
  console.log('saving metrics:', metrics, 'at timestamp:', timestamp);
  getOrCreateUserId(function(userId) {
    console.log('user id is:', userId);

    let dataKey = `user-${userId}`;

    setFirebaseData(dataKey, metrics);
  });
}

// Create alarms that run every 1, 5 and 60 minutes
// See https://developer.chrome.com/apps/alarms
chrome.alarms.create('everyMinute', {
  when: Date.now() + 10, // <-- adding 10 makes it so that this alarm goes off immediately
  periodInMinutes: 1 // <-- this makes it so the alarm goes off every 1 minute
});
chrome.alarms.create('every5Minutes', {
  when: Date.now() + 10,
  periodInMinutes: 5
});
chrome.alarms.create('every60Minutes', {
  when: Date.now() + 10,
  periodInMinutes: 60
});

// Add a single "onAlarm" listener. This is fired every time
// any alarm goes off, so you have to check the alarm's name to
// figure out which alarm went off, and then decide how to react to it.
// Note that the alarms will continue going off even when all windows are closed.
chrome.alarms.onAlarm.addListener(function(alarm) {
  console.log(`Brrrrring! Alarm named: "${alarm.name}" just went off`);
  if (alarm.name === 'everyMinute') {
    // code that runs every minute -- once everything is working the way you want it to,
    // you might want to move this code to run every 5 or 60 minutes instead.
    getMetrics(function(metrics) {
      saveMetrics(metrics);
    });
  } else if (alarm.name === 'every5Minutes') {
    // code that runs every 5 minutes
  } else if (alarm.name === 'every60Minutes') {
    // code that runs once an hour
  }
});
