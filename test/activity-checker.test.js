import ActivityChecker from '../src/activity-checker';
// var assert = require('chai').assert;
// var should = require('chai').should;
// var expect = require('chai').expect;

// cases:
// more than one use on the page
// have a handle which can force inactivity (single sign out)
// clean all subscriptions after destroy (f.e. keepAlive)

describe('activity checker', function() {
    var ac, foo;
    // this.slow(1000);

    beforeAll(function () {
        foo = {
            setBar: function(value) {
                bar = value;
            }
        };

        spyOn(foo, 'setBar');

        // ac = new ActivityChecker({
        //     nameSpace: 'AC',
        //     idleTimeout: 500,
        //     awayTimeout: 1000,
        //     keepAliveInterval: 800
        // }).onActive(function () {
        //     foo.setBar();
        // });
    });

    afterAll(function () {
    });

    describe('wow', function () {

        beforeAll(function () {
            ac = new ActivityChecker({
                nameSpace: 'AC',
                idleTimeout: 500,
                awayTimeout: 1000,
                keepAliveInterval: 800
            });
        });

        afterAll(function () {
            ac.dispose();
        });

        it("tracks that the cb was called", function(done) {
            ac.onActive(function () {
                foo.setBar();
                done();
            });
        });

        it("tracks that the spy was called", function() {
            expect(foo.setBar).toHaveBeenCalled();
        });

        it("tracks that the spy was called x times", function() {
            expect(foo.setBar).toHaveBeenCalledTimes(1);
        });

        /*it('should call onActive', function(done) {
         // var scheduler = new Rx.TestScheduler();
         // var originalThrottle = Rx.Observable.prototype.throttle;
         // spyOn(Rx.Observable.prototype, 'throttle').and.callFake(function(dueTime) {
         //     return originalThrottle.call(this, dueTime, scheduler);
         // });



         var onActive = function () {
         done();
         };
         // onActive.should.eventually.be.called();
         ac.onActive(onActive);
         });*/


    });

    /*context('onActive', function () {
        it('should not call onActive', function() {
            fail('not implemented');
        });
        it('should call onActive', function() {
            fail('not implemented');
        });
    });

    context('onIdle', function () {

        it('should call onIdle', function(done) {
            ac.onIdle(done);
        });
    });
    context('onDismiss', function () {
        it('should call onDismiss', function() {
            fail('not implemented');
        });
    });
    context('onKeepAlive', function () {
        it('should call onKeepAlive', function() {
            fail('not implemented');
        });
    });
    context('onAway', function () {
        it('should call onAway', function() {
            fail('not implemented');
        });
    });*/

/*
    it('should be marked as slow', function(done){
        setTimeout(done, 1000);
    });

    it('should have cool diff', function() {
        //fail('not implemented');
        const actual = `body {
            font: Helvetica, arial, sans-serif;
            color: #fff;
        }`;
        const expected = `body {
            font: Helvetica, arial, sans-serif;
            color: white;
        }`;
        //actual.should.be.equal(expected);
        expect(actual).to.eql(expected);
        //assert.equal(actual, expected);
    });

    it('should run some test with a callback', (done) => {
        const someResponse = [{ some: 'response' }];
        var someCollection = [{ some: 'response1' }];

        someCollection.should.deep.equal(someResponse);
    });
*/
});
