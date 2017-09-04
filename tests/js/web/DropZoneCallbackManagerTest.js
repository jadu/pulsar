import DropZoneCallbackManager from '../../../js/DropZone/DropZoneCallbackManager';

describe('DropZoneCallbackManager', () => {
    let callbackManager;
    let callbackSpy;
    let dropZoneSpy;

    beforeEach(() => {
        callbackManager = new DropZoneCallbackManager();
        callbackSpy = sinon.spy();
        dropZoneSpy = sinon.spy();
    });

    describe('create()', () => {
        it('should merge the data with a reference to the instance and invoke callback', () => {
            callbackManager.create(callbackSpy, dropZoneSpy, { foo: 'bar' });

            expect(callbackSpy).to.have.been.calledWith({ foo: 'bar', instance: sinon.match.same(dropZoneSpy) });
            expect(callbackSpy).to.have.been.calledOnce;
        });

        it('should just pass the instance through if we dont have data', () => {
            callbackManager.create(callbackSpy, dropZoneSpy);

            expect(callbackSpy).to.have.been.calledWith({ instance: sinon.match.same(dropZoneSpy) });
            expect(callbackSpy).to.have.been.calledOnce;
        });
    });
});
