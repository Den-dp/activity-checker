# activity-checker
User activity checker that works across browser tabs/windows.

Usage:
```js
(function () {
    var idleChecker = new ActivityChecker({
        namespace: 'test',
        idleTimeout: 5000,
        awayTimeout: 10000
    })
        .onIdle(function () {
            document.querySelector('body').className = 'idle';
            document.querySelector('#status').innerText = 'IDLE';
        })
        .onDismiss(function () {
            document.querySelector('body').className = 'active';
            document.querySelector('#status').innerText = 'ACTIVE';
        })
        .onAway(function () {
            document.querySelector('body').className = 'away';
            document.querySelector('#status').innerText = 'AWAY';
        })
        .onKeepAlive(function () {
        })
})();
```

