const Rx = require('rx-lite');

Rx.Observable.prototype.doConsoleLog = function (message) {
    if (true) {
        return this.tap(
            function (x) {
                if (message) {
                    console.info(`[AC::${message}]`, x);
                } else {
                    console.info(x);
                }
            },
            function (e) {
                if (message) {
                    console.error(`[AC::${message}]`, e);
                } else {
                    console.error(e);
                }
            },
            function () {
                if (message) {
                    console.log(`[AC::${message}]` + ' -> completed');
                } else {
                    console.info('completed');
                }
            }
        );
    }
    return this;
};

function noop() { }

module.exports = function ActivityChecker({
    nameSpace = 'AC',
    idleTimeout = 5000,
    awayTimeout = 10000,
    keepAliveInterval = 20000,
    onIdle = noop,
    onActive = noop,
    onDismiss = noop,
    onAway = noop,
    onKeepAlive = noop,
} = {}) {

    if (idleTimeout > awayTimeout) {
        throw new Error('awayTimeout must be greater then idleTimeout');
    }

    function notifyOtherTabs(e) {
        localStorage.setItem(nameSpace, Date.now())
    }

    const DOMObservables = [
        'DOMContentLoaded',
        'mousemove',
        'mousedown',
        'scroll',
        'DOMMouseScroll',
        'keydown',
        'touchstart',
        'touchmove'
    ].map(eventName => Rx.Observable.fromEvent(document, eventName));

    const pageActivitySource = Rx.Observable.merge(DOMObservables)
        .startWith('initialization')
        .throttle(1000)
        .do(notifyOtherTabs)
        .doConsoleLog('pageActivitySource');

    const activityFromAnotherTabSource = Rx.Observable.fromEvent(window, 'storage')
        .filter(e => e.key === nameSpace)
        .map(v => v.newValue)
        .doConsoleLog('activityFromAnotherTabSource');

    const siteActivitySource = Rx.Observable.merge(pageActivitySource, activityFromAnotherTabSource)
        .do(onActive)
        .doConsoleLog('siteActivity');

    const publishedSiteActivity = siteActivitySource.publish();

    const keepAliveSource = Rx.Observable.interval(keepAliveInterval)
        .do(onKeepAlive)
        .doConsoleLog('keepAliveSource');

    const keepAliveSubscription = keepAliveSource.subscribe();

    const idleSource = publishedSiteActivity.debounce(idleTimeout)
        .do(onIdle)
        .doConsoleLog('idleSource')
        .share();

    /*
    idleSource         ------I---------I------>
    siteActivitySource A-A-----A-A-A-----A-A-->
    dismissSource      --------D---------D---->
    */
    const dismissSource = idleSource.flatMap(() => publishedSiteActivity.take(1))
        .do(onDismiss)
        .doConsoleLog('dismissSource');

    const dismissSubscription = dismissSource.subscribe();

    const awaySource = publishedSiteActivity.debounce(awayTimeout)
        .do(onAway)
        .doConsoleLog('awaySource');

    const awaySubscription = awaySource.subscribe(()=>{
        this.dispose();
    });

    const connection = publishedSiteActivity.connect();

    this.dispose = function () {
        keepAliveSubscription.dispose();
        dismissSubscription.dispose();
        awaySubscription.dispose();
        connection.dispose();
    };
}
