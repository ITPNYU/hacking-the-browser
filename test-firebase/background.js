var config = {
  apiKey: 'AIzaSyBi5U3k8yb09Oenki-r0fEuNMswqgehDXI',
  authDomain: 'htb-2019.firebaseapp.com',
  databaseURL: 'https://htb-2019.firebaseio.com',
  projectId: 'htb-2019',
  storageBucket: 'htb-2019.appspot.com',
  messagingSenderId: '488028042916'
};
let {
  setFirebaseLogging,
  setFirebaseData,
  getFirebaseData,
  onFirebaseDataChange
} = window.initializeFirebase(config);

// To turn OFF logging, uncomment the line below
setFirebaseLogging(false);

setFirebaseData('test', 123);
getFirebaseData('test', function(value) {
  console.log('the value of test is:', value);
});
onFirebaseDataChange('test', function(v) {
  console.log('test changed to: ', v);
});

chrome.browserAction.onClicked.addListener(function() {
  getFirebaseData('clicks', function(value) {
    if (value === undefined) {
      setFirebaseData('clicks', 0);
    } else {
      setFirebaseData('clicks', value + 1);
    }
  });
});

onFirebaseDataChange('clicks', function(v) {
  chrome.browserAction.setBadgeText({ text: '' + v });
});
