# activity-checker

> User activity checker that works across browser tabs/windows.

[![NPM][package-icon]][package-url]

[![Build Status][package-ci-image]][package-ci-url]
[![semantic-release][semantic-image]][semantic-url]
[![dependencies][package-dependencies-image]][package-dependencies-url]
[![devdependencies][package-devdependencies-image]][package-devdependencies-url]


`activity-checker` mainly can track 3 following situations:
* user is Active
* user is Idle
* user is Away

This achieved by listening to the events from two event sources:

* Current page activity (**DOMEvents**: `'DOMContentLoaded', 'mousemove', 'mousedown', 'scroll', 'DOMMouseScroll', 'keydown', 'touchstart', 'touchmove'`)
* Activity from another tab (`'storage'` event of **localStorage**)

> To achieve communication between tabs we use `'storage'` event of localStorage. localStorage fires an event whenever an item is added, modified, or removed in another browsing context. This means that whenever we touch localStorage in any given tab, all other tabs can learn about it by listening for the storage event on the window object.

Also `activity-checker` can call your function passed into `onKeepAlive()` callback every `keepAliveInterval` ms where you can call server to refresh session.

## Installation

This package is distributed via npm:

```
npm install activity-checker -S
```

## Usage

```js
import { ActivityChecker } from 'activity-checker';
// or if loaded as UMD
// const ActivityChecker = window.ac.ActivityChecker;

new ActivityChecker({
    idleTimeout: 5000,
    awayTimeout: 10000,
    // invokes when user was Idle more than `idleTimeout` ms but less then `awayTimeout` ms
    onIdle: function () {
        document.querySelector('body').className = 'idle';
        document.querySelector('#status').innerText = 'IDLE';
    },
    // invokes when user was Idle more than `awayTimeout` ms
    onAway: function () {
        document.querySelector('body').className = 'away';
        document.querySelector('#status').innerText = 'AWAY';
    }
});
```

It is worth mentioning that *AC* uses inside the idea of namespaces. The `nameSpace` option is primarily needed for filtering events we are interesting in from all events (which may be fired by localStorage). `nameSpace` is basically a name of the localStorage field to listen.

## Advanced usage

```js
import { ActivityChecker } from 'activity-checker';

new ActivityChecker({
    nameSpace: 'mySite', //if not defined 'AC' is default value
    idleTimeout: 5000,
    awayTimeout: 10000,
    keepAliveInterval: 2500,
    // invokes when user was Idle more than `idleTimeout` ms but less then `awayTimeout` ms
    onIdle: function () {
        document.querySelector('body').className = 'idle';
        document.querySelector('#status').innerText = 'IDLE';
    },
    onActive: function () {
        document.querySelector('body').className = 'active';
        document.querySelector('#status').innerText = 'ACTIVE';
    },
    onDismiss: function () {
    },
    // invokes when user was Idle more than `awayTimeout` ms
    onAway: function () {
        document.querySelector('body').className = 'away';
        document.querySelector('#status').innerText = 'AWAY';
    },
    // invokes every `keepAliveInterval` ms
    onKeepAlive: function () {
    }
});
```


[package-icon]: https://nodei.co/npm/activity-checker.svg?downloads=true
[package-url]: https://npmjs.org/package/activity-checker
[package-ci-image]: https://img.shields.io/travis/Den-dp/activity-checker.svg?style=flat-square
[package-ci-url]: https://travis-ci.com/Den-dp/activity-checker
[package-dependencies-image]: https://img.shields.io/david/den-dp/activity-checker.svg?style=flat-square
[package-dependencies-url]: https://david-dm.org/den-dp/activity-checker
[package-devdependencies-image]: https://img.shields.io/david/dev/den-dp/activity-checker.svg?style=flat-square
[package-devdependencies-url]: https://david-dm.org/den-dp/activity-checker#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-url]: https://github.com/semantic-release/semantic-release
