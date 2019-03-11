var _firebaseLogging = true;
var _db = null;
var _FIREBASE_COLLECTION = 'data';

function initializeFirebase(config) {
  if (!config || !config.apiKey || config.apiKey === 'YOUR_API_KEY') {
    console.error('You must pass a config object to initializeFirebase');
    return;
  }
  if (!window.firebase) {
    console.error(
      'No firebase global has been initialized -- is the firebase script included with this extension?'
    );
    return;
  }
  window.firebase.initializeApp(config);
  _db = window.firebase.firestore();

  function getFirebaseData(key, callback) {
    validateInitialization();
    _db
      .collection(_FIREBASE_COLLECTION)
      .doc(key)
      .get()
      .then(val => {
        let data = val.data();
        let value = data ? data.value : undefined;
        log(`getFirebaseData: got key "${key}": "${JSON.stringify(value)}"`);
        callback(value);
      });
  }

  function onFirebaseDataChange(key, callback) {
    let ref = _db.collection(_FIREBASE_COLLECTION).doc(key);
    ref.onSnapshot(val => {
      let data = val.data();
      let value = data ? data.value : undefined;
      log(
        `onFirebaseDataChange: value for "${key}" changed to : "${JSON.stringify(
          value
        )}"`
      );
      callback(value);
    });
  }

  function log(...args) {
    if (!_firebaseLogging) {
      return;
    }
    console.log(...args);
  }

  function setFirebaseLogging(bool) {
    _firebaseLogging = bool;
  }

  function setFirebaseData(key, value, callback) {
    validateSetFirebaseData(key, value);

    _db
      .collection(_FIREBASE_COLLECTION)
      .doc(key)
      .set({ value })
      .then(() => {
        log(
          `setFirebaseData: set "${key}" value to "${JSON.stringify(value)}"`
        );
        callback && callback();
      });
  }

  function validateInitialization() {
    if (!_db) {
      throw new Error(
        'Firebase has not been initialized yet. You must call initializeFirebase(config)'
      );
    }
  }

  function validateSetFirebaseData(key, value) {
    validateInitialization();
    if (typeof key !== 'string') {
      throw new Error(
        `You must pass a string key to setFirebaseData. You passed: "${key}"`
      );
    }
    if (arguments.length !== 2) {
      throw new Error(
        `You must pass 2 arguments to setFirebaseData, a key and the value. You passed key "${key}" and value: "${JSON.stringify(
          value
        )}"`
      );
    }
  }

  return {
    setFirebaseLogging,
    setFirebaseData,
    getFirebaseData,
    onFirebaseDataChange
  };
}

let {
  setFirebaseLogging,
  setFirebaseData,
  getFirebaseData,
  onFirebaseDataChange
} = initializeFirebase(config);
