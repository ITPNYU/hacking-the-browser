// To turn OFF logging, uncomment the line below
// setFirebaseLogging(false);

/*
  Use `setFirebaseData` to set the string `key` to the
  `value`.
  This function can be passed an optional 3rd argument that is
  a callback function. It will be called after the data
  is done being set in firebase
*/
setFirebaseData('mydata', { favoriteColor: 'blue' }, function() {
  console.log('Finished setting "mydata"');

  // Now that 'mydata' is done being set, we can read it,
  // inside this callback:

  /*
    Use `getFirebaseData` to get the value of the string key
    The callback will be called with the value.
  */
  getFirebaseData('mydata', function(value) {
    console.log('the value of "mydata" is:', value);
  });
});

/*
  Use `onFirebaseDataChange` to listen to changes of a particular key.
  The callback function is called *every time the value of the key changes*.
*/
onFirebaseDataChange('mydata', function(value) {
  console.log('the value of mydata changed to: ', value);
});
