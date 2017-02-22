console.log('background for firebase clicks example');

// Initialize Firebase
// This uses my personal api key for firebase.
// If you copy and paste this code, remember to create your OWN
// free firebase app and replace this config with yours.
var config = {
	apiKey: "AIzaSyB4cHhG0lhQ_0QBhQX1M9pfHbfN-rx5k7s",
	authDomain: "extension-backend.firebaseapp.com",
	databaseURL: "https://extension-backend.firebaseio.com",
	storageBucket: "extension-backend.appspot.com",
	messagingSenderId: "778159737395"
};
firebase.initializeApp(config);

var classId = 'HTB-week-5';
var classClickRefName = 'class/' + classId + '/clickCount';

function watchClickCount(callback) {
  var clickCountRef = firebase.database().ref(classClickRefName);
  clickCountRef.on('value', function(snapshot) {
    var value = snapshot.val();
    if (value === null) {
      value = { count: 0 };
    }
    console.log('watched value:',value);
    callback(value);
  });
}

watchClickCount(function(value) {
  var countString = '' + value.count;
  chrome.browserAction.setBadgeText({text: countString});
  if (value.count > 9999) {
    resetCount();
  }
});

function resetCount() {
  writeClickCount(0);
}

function readClickCountOnce(callback) {
  var clickCountRef = firebase.database().ref(classClickRefName);
  clickCountRef.once('value').then(function(snapshot) {
    var value = snapshot.val();
    if (value === null) {
      value = { count: 0 };
    }
    console.log('read value:',value);
    callback(value);
  });
}

function writeClickCount(int) {
  console.log('setting click count to:',int);
  var clickCountRef = firebase.database().ref(classClickRefName);
  clickCountRef.set({count: int});
}

chrome.browserAction.onClicked.addListener(function() {
  console.log('clicked');
  readClickCountOnce(function(value) {
    console.log('clicked ->',value.count);
    writeClickCount(value.count + 1);
  });
});
