# <%= appName %>

## Includes

* [React](https://github.com/facebook/react) & [React Native](https://github.com/facebook/react-native) v0.36
* [Redux](https://github.com/reactjs/redux) & [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) & [On Debugger](https://github.com/jhen0409/remote-redux-devtools-on-debugger)
* [Immutable DevTools](https://github.com/andrewdavey/immutable-devtools)
* [Babel](https://github.com/babel/babel) & Plugins: [transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)

## Getting Started

#### Requirements
- Node.js
- [Watchman](https://facebook.github.io/watchman/)
- Xcode (for ios) / Android Studio (for android)
- React Native CLI

Note: Both Xcode and Android Studio come with built-in mobile device simulator. For android you can also use a 3rd party stand alone simulator [Genymotion](https://www.genymotion.com).

Check out React Native's [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) for more details.

#### Install the React Native CLI
```bash
$ npm install -g react-native-cli
```

## Development

Run the following commands in the project's root directory.
#### 1. Start local server (the packager)

```bash
$ npm start
```

#### 2. Run the app

###### for iOS
Open simulator and run the app:
```bash
$ react-native run-ios
```

###### for Android (5.0+)
open Android simulator manually and then run the following commands to run the app:
```bash
$ adb reverse tcp:8097 tcp:8097  # for React DevTools
$ react-native run-android
```

## Debugging

#### 1. Install [React Native Debugger](https://github.com/jhen0409/react-native-debugger)

#### 2. Toggle on debug mode on device
  1. Open setting menu: `cmd + d` for ios simulator; `cmd + m` for Android Studio's built-in simulator

  2. Toggle on `Debug JS Remotely`
  3. Once debug mode is toggled on, the React Native Debugger should be opened automatically. If not, manually open it and reload the app by `cmd + r` on ios / double pressing `r` on android

If React Native Debugger is not install, [Remote Redux DevTools](https://github.com/zalmoxisus/remote-redux-devtools) and [On Debugger](https://github.com/jhen0409/remote-redux-devtools-on-debugger) will be used by default.

## Test

We used [react-native-mock](https://github.com/lelandrichardson/react-native-mock), and test with [Mocha](https://github.com/mochajs/mocha), [Enzyme](https://github.com/airbnb/enzyme).

```bash
$ npm test
```
