# Firebase Starter Template

This is a starter template for creating an extension that uses
[Firebase](https://firebase.com) for realtime data storage and communication.

## Usage

To create your own firebase-based extension, use this extension as a template.

1. Make your own copy of this extension
2. Follow the instructions [here](https://docs.google.com/presentation/d/1SJqwbVgl3ocsKJDBe8UcclncF7vJIwJFv45czWvHx30/edit#slide=id.g38df1eb73e_0_5) to sign up for Firebase
3. Paste your config in the [firebase-config.js file](./firebase-config.js)
4. In the background script, you can now use the firebase methods (see details below)

### Firebase methods

This extension provides a simplified interface to use Firebase. It provides the following functions:

- `setFirebaseData(key, value, callback)` -- Set data
- `getFirebaseData(key, callback)` -- Get data
- `onFirebaseDataChange(key, callback)` -- The callback will be called every time the value for `key` changes
- `setFirebaseLogging(boolean)` -- Used to turn on/off the logging

See the [background.js file](./background.js) for examples of usage of these functions.
