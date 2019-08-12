# activity-checker
User activity checker that works across browser tabs/windows.

*AC* mainly can track 3 following situations:
* user is Active
* user is Idle
* user is Away

This achieved by listening to the events from two event sources:

* Current page activity (**DOMEvents**: `'DOMContentLoaded', 'mousemove', 'mousedown', 'scroll', 'DOMMouseScroll', 'keydown', 'touchstart', 'touchmove'`)
* Activity from another tab (`'storage'` event of **localStorage**)

> To achieve communication between tabs we use `'storage'` event of localStorage. localStorage fires an event whenever an item is added, modified, or removed in another browsing context. This means that whenever we touch localStorage in any given tab, all other tabs can learn about it by listening for the storage event on the window object.

Also *AC* can call your function passed into `onKeepAlive()` callback every `keepAliveInterval` ms where you can call server to refresh session.

Usage of *AC* is very simple:
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

Advances usage:
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
