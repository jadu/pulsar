import DropZoneIdleTimer from '../../../js/DropZone/DropZoneIdleTimer';

describe('DropZoneIdleTimer', () => {
    let clock;
    let timer;
    let duration;
    let callback;
    let clearStub;

    beforeEach(() => {
        callback = sinon.spy();
        duration = 1000;
        clock = sinon.useFakeTimers();
        clearStub = sinon.stub(clock, 'clearTimeout');
        timer = new DropZoneIdleTimer(duration);
    });

    afterEach(() => {
        clock.restore();
        clearStub.restore();
    });

    describe('start()', () => {
        it('should execute callback after duration', () => {
            timer.start(callback);
            clock.tick(duration);
            expect(callback).to.have.been.calledOnce;
        });

        it('should remove the reference to the timeout once executed', () => {
            timer.start(callback);
            clock.tick(duration - 1);
            expect(timer.timer).to.not.be.null;
            clock.tick(1);
            expect(timer.timer).to.be.null;
        });
    });

    describe('clear()', () => {
        it('should clear the current timer if we have one', () => {
            timer.timer = 'foo';
            timer.clear();
            expect(clock.clearTimeout).to.have.been.calledWith('foo');
            expect(clock.clearTimeout).to.have.been.calledOnce;
        });

        it('should ignore if the current timer ref is null', () => {
            timer.timer = null;
            timer.clear();
            expect(clock.clearTimeout).to.have.not.been.called;
        });
    });
});
