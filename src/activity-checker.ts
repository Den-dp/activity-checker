import { fromEvent, interval, merge } from 'rxjs';
import { debounceTime, filter, flatMap, map, publish, share, startWith, take, tap, throttleTime } from 'rxjs/operators';

const noop = () => {};

export function ActivityChecker({
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
        localStorage.setItem(nameSpace, Date.now().toString())
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
    ].map(eventName => fromEvent(document, eventName));

    const pageActivitySource = merge(...DOMObservables).pipe(
        startWith('initialization'),
        throttleTime(1000),
        tap(notifyOtherTabs)
    );

    const activityFromAnotherTabSource = fromEvent<StorageEvent>(window, 'storage').pipe(
        filter(e => e.key === nameSpace),
        map(v => v.newValue)
    );

    const siteActivitySource = merge(pageActivitySource, activityFromAnotherTabSource).pipe(
        tap(onActive)
    );

    const publishedSiteActivity = publish()(siteActivitySource);

    const keepAliveSource = interval(keepAliveInterval).pipe(
        tap(onKeepAlive)
    );

    const keepAliveSubscription = keepAliveSource.subscribe();

    const idleSource = publishedSiteActivity.pipe(
        debounceTime(idleTimeout),
        tap(onIdle),
        share()
    );

    /*
    idleSource         ------I---------I------>
    siteActivitySource A-A-----A-A-A-----A-A-->
    dismissSource      --------D---------D---->
    */
    const dismissSource = idleSource.pipe(
        flatMap(() => publishedSiteActivity.pipe(
            take(1)
        )),
        tap(onDismiss)
    );

    const dismissSubscription = dismissSource.subscribe();

    const awaySource = publishedSiteActivity.pipe(
        debounceTime(awayTimeout),
        tap(onAway)
    );

    const awaySubscription = awaySource.subscribe(()=>{
        this.unsubscribe();
    });

    const connection = publishedSiteActivity.connect();

    this.unsubscribe = function () {
        keepAliveSubscription.unsubscribe();
        dismissSubscription.unsubscribe();
        awaySubscription.unsubscribe();
        connection.unsubscribe();
    };
}
